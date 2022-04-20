{
var admin_browser = false;
var afAdminPanel = false;

mp.keys.bind(0x24, true, function() { // Открыть/Закрыть админпанель
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x24)) return false;
	if(afAdminPanel) return false;
	if(typeof(localPlayer.getVariable("player.status")) === "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
	if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
		return notyAPI.error("Эта функция доступна только администраторам.", 3000, true);
	
	if(!admin_browser) {
		afAdminPanel = true;
		setTimeout(function() { afAdminPanel = false }, 500);
		
		allowBinds = [0x24];
		admin_browser = mp.browsers.new("package://CEF/adminPanel/index.html");
		
		mp.game.ui.displayRadar(false);
		
		let onlinePlayers = {};
		onlinePlayers["players"] = [];
		mp.players.forEach(
			(player, id) => {
				//if(player != localPlayer) {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
						onlinePlayers.players.push({"id":player.getVariable('player.id'),"nick":player.getVariable('player.nick')});
					}
				//}
			}
		);
		
		setTimeout(function() {
			admin_browser.execute("gettedOnlinePlayers('"+localPlayer.getVariable("player.status")+"', '"+JSON.stringify(onlinePlayers)+"', '"+JSON.stringify(globalAdmEvent)+"');");
			mp.gui.cursor.visible = true;
		}, 100);
	}else{
		closeAdminPanel();
	}
	
	/*
	if(hud_browser) {
		if(adminPanel) {
			closeVehMenu();
		}else{
			if(afadminPanel) return false;
			afadminPanel = true;
			setTimeout(function() { afadminPanel = false }, 500);
			
			if(localPlayer.getVariable('player.vehs')) {
				var tempJSon = localPlayer.getVariable('player.vehs');
				
				for(var k in tempJSon.vehicles) {
					let vehHash = tempJSon.vehicles[k].hash;
					let vehName = vehHash;
					if(typeof(vehStats[0][vehHash]) != "undefined") vehName = vehStats[0][vehHash].name;
					tempJSon.vehicles[k].name = vehName;
				}
				
				if(localPlayer.getVariable('player.houses')) {
					hud_browser.execute("refreshadminPanel('"+JSON.stringify(tempJSon)+"', '"+JSON.stringify(localPlayer.getVariable('player.houses'))+"');");
				}else{
					hud_browser.execute("refreshadminPanel('"+JSON.stringify(tempJSon)+"');");
				}
				
				hud_browser.execute('toggleVehiclesPanel(true);');
				mp.gui.cursor.visible = true;
				adminPanel = true;
				
				allowBinds = [0x72];
				
				mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
			}else{
				chatAPI.sysPush("<span style=\"color:#FF6146\"> * Ваш транспорт не инициализирован, повторите ещё раз..</span>");
			}
		}
	}*/
});

function closeAdminPanel() {
	if(admin_browser) {
		restoreBinds();
		admin_browser.destroy();
		admin_browser = false;
		mp.gui.cursor.visible = false;
		mp.game.ui.displayRadar(true);
	}
}

function getPlayerInfoForAP(playerIDforGet) {
	if(admin_browser && typeof(playerIDforGet) !== "undefined") {
		playerIDforGet = parseInt(playerIDforGet);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					if(sID == playerIDforGet) {
						let sNick = player.getVariable("player.nick").toString();
						let sLogin = player.getVariable("player.login").toString();
						let sMoney = parseInt(player.getVariable("player.money"));
						let sBank = parseInt(player.getVariable("player.bank"));
						let sLVLText = "недоступно";
						let sBlocks = player.getVariable("player.blocks");
						if(typeof(sBlocks.mins) !== "undefined" && typeof(sBlocks.lvl) !== "undefined") {
							sBlocks.mins = Math.round(parseInt(sBlocks.mins) / 60);
							sLVLText = sBlocks.mins.toString()+" ч. ("+sBlocks.lvl+" lvl.)";
						}
						
						let sJob = JSON.stringify(player.getVariable("player.job")).toString();
						
						return admin_browser.execute("gettedPlayerInfo('"+sID+"','"+sNick+"','"+sLogin+"','"+sMoney+"','"+sBank+"','"+sLVLText+"','"+sJob+"');");
					}
				}
			}
		);
	}
}
mp.events.add("getPlayerInfoForAP", getPlayerInfoForAP);

function teleTo(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы телепортировались к <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('teleTo', player);
					}
				}
			}
		);
	}
}
mp.events.add("teleTo", teleTo);

function teleToMe(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы телепортирвали к себе <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('teleToMe', player);
					}
				}
			}
		);
	}
}
mp.events.add("teleToMe", teleToMe);

function teleToMeAndVeh(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы телепортирвали к себе <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('teleToMeAndVeh', player);
					}
				}
			}
		);
	}
}
mp.events.add("teleToMeAndVeh", teleToMeAndVeh);

var specToID = -1;
function specAct(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		if(typeof(localPlayer.getVariable("player.spec")) !== "undefined") {
			if(!localPlayer.getVariable("player.spec")) {
				mp.players.forEach(
					(player, id) => {
						if(player != localPlayer) {
							if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
								let sID = parseInt(player.getVariable("player.id"));
								let sNick = player.getVariable("player.nick").toString();
								if(sID == thePlayerID) {
									if(player.handle == 0) player.specWaiting = true;
									else specToID = player.remoteId;
									return mp.events.callRemote('specAct', player, true);
								}
							}
						}
					}
				);
			}else{
				mp.players.forEach(
					(player, id) => {
						player.specWaiting = undefined;
					}
				);
				specToID = -1;
				return mp.events.callRemote('specAct', localPlayer, false);
			}
		}else{
			if(!localPlayer.getVariable("player.spec")) {
				mp.players.forEach(
					(player, id) => {
						if(player != localPlayer) {
							if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
								let sID = parseInt(player.getVariable("player.id"));
								let sNick = player.getVariable("player.nick").toString();
								if(sID == thePlayerID) {
									if(player.handle == 0) player.specWaiting = true;
									else specToID = player.remoteId;
									return mp.events.callRemote('specAct', player, true);
								}
							}
						}
					}
				);
			}
		}
	}
}
mp.events.add("specAct", specAct);

function setSpecTarget(thePlayerID) {
	if(typeof(thePlayerID) !== "undefined") specToID = thePlayerID;
}
mp.events.add("setSpecTarget", setSpecTarget);

function kickAct(thePlayerID, kickReason) {
	if(admin_browser && typeof(thePlayerID) !== "undefined" && typeof(kickReason) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		kickReason = kickReason.toString();
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы кикнули <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>), причина: <span style=\"color:#FEBC00\"><b>"+kickReason+"</b></span>.");
						return mp.events.callRemote('kickAct', player, kickReason);
					}
				}
			}
		);
	}
}
mp.events.add("kickAct", kickAct);

function banAct(thePlayerID, banValue, banPeriod, banReason, banAcc, banClub, banSerial) {
	if(admin_browser && typeof(thePlayerID) !== "undefined" && typeof(banValue) !== "undefined" && typeof(banPeriod) !== "undefined" && typeof(banReason) !== "undefined" && typeof(banAcc) !== "undefined" && typeof(banClub) !== "undefined" && typeof(banSerial) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						let period = "ч.";
						if(banPeriod == "banDays") period = "дн.";
						else if(banPeriod == "banYears") period = "г.";
						chatAPI.notifyPush(" * Вы забанили <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>) на <span style=\"color:#FEBC00\"><b>"+banValue+" "+period+"</b></span>, причина: <span style=\"color:#FEBC00\"><b>"+banReason+"</b></span>.");
						let banAccText = "нет", banClubText = "нет", banSerialText = "нет";
						if(banAcc == "true") banAccText = "да";
						if(banClub == "true") banClubText = "да";
						if(banSerial == "true") banSerialText = "да";
						chatAPI.notifyPush(" * Блокировки: аккаунт - <span style=\"color:#FEBC00\"><b>"+banAccText+"</b></span>, socialclub - <span style=\"color:#FEBC00\"><b>"+banClubText+"</b></span>, серийник - <span style=\"color:#FEBC00\"><b>"+banSerialText+"</b></span>.");
						return mp.events.callRemote('banAct', player, banValue, banPeriod, banReason, banAcc, banClub, banSerial);
					}
				}
			}
		);
	}
}
mp.events.add("banAct", banAct);

function jailAct(thePlayerID, jailValue, jailReason) {
	if(admin_browser && typeof(thePlayerID) !== "undefined" && typeof(jailValue) !== "undefined" && typeof(jailReason) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		jailValue = jailValue.toString();
		jailReason = jailReason.toString();
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						if(jailValue != "0") chatAPI.notifyPush(" * Вы посадили в тюрьму <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>), причина: <span style=\"color:#FEBC00\"><b>"+jailReason+"</b></span>.");
						else chatAPI.notifyPush(" * Вы освободили из тюрьмы <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>)");
						return mp.events.callRemote('jailAct', player, jailValue, jailReason);
					}
				}
			}
		);
	}
}
mp.events.add("jailAct", jailAct);

function muteAct(thePlayerID, muteValue, muteReason) {
	if(admin_browser && typeof(thePlayerID) !== "undefined" && typeof(muteValue) !== "undefined" && typeof(muteReason) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		muteValue = muteValue.toString();
		muteReason = muteReason.toString();
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						if(muteValue != "0") chatAPI.notifyPush(" * Вы заглушили <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>), причина: <span style=\"color:#FEBC00\"><b>"+muteReason+"</b></span>.");
						else chatAPI.notifyPush(" * Вы сняли заглушку с <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>)");
						return mp.events.callRemote('muteAct', player, muteValue, muteReason);
					}
				}
			}
		);
	}
}
mp.events.add("muteAct", muteAct);

function dickAct(thePlayerID, dickValue, dickReason) {
	if(admin_browser && typeof(thePlayerID) !== "undefined" && typeof(dickValue) !== "undefined" && typeof(dickReason) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		dickValue = dickValue.toString();
		dickReason = dickReason.toString();
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						if(dickValue != "0") chatAPI.notifyPush(" * Вы налепили хуй на лоб <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>), причина: <span style=\"color:#FEBC00\"><b>"+dickReason+"</b></span>.");
						else chatAPI.notifyPush(" * Вы сняли хуй со лба <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>)");
						return mp.events.callRemote('dickAct', player, dickValue, dickReason);
					}
				}
			}
		);
	}
}
mp.events.add("dickAct", dickAct);

function slapAct(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы пнули игрока <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('slapAct', player);
					}
				}
			}
		);
	}
}
mp.events.add("slapAct", slapAct);

function freezeAct(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы заморозили игрока <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('freezeAct', player);
					}
				}
			}
		);
	}
}
mp.events.add("freezeAct", freezeAct);

function freezeMe() {
	localPlayer.freezePosition(true);
	if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(true);
}
mp.events.add("freezeMe", freezeMe);

function unFreezeAct(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы разморозили игрока <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('unFreezeAct', player);
					}
				}
			}
		);
	}
}
mp.events.add("unFreezeAct", unFreezeAct);

function unFreezeMe() {
	localPlayer.freezePosition(false);
	if(localPlayer.vehicle) localPlayer.vehicle.freezePosition(false);
}
mp.events.add("unFreezeMe", unFreezeMe);

function killAct(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы убили игрока <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('killAct', player);
					}
				}
			}
		);
	}
}
mp.events.add("killAct", killAct);

function makeAnnounce(announceText) {
	if(admin_browser && typeof(announceText) !== "undefined") {
		mp.events.callRemote('makeAnnounce', announceText);
	}
}
mp.events.add("makeAnnounce", makeAnnounce);

function makeAnnounceChat(announceText) {
	if(admin_browser && typeof(announceText) !== "undefined") {
		mp.events.callRemote('makeAnnounceChat', announceText);
	}
}
mp.events.add("makeAnnounceChat", makeAnnounceChat);

function announceTexted(announceText) {
	if(typeof(announceText) !== "undefined") {
		if(hud_browser) hud_browser.execute('playSound("attention", "0.1");');
		mp.game.ui.messages.showShard("сообщение от администрации", announceText, 6, 2, 10500);
	}
}
mp.events.add("announceTexted", announceTexted);

function notifyPlayerFromAdmin(theText) {
	if(typeof(theText) !== "undefined") {
		theText = theText.toString();
		chatAPI.realSystemPush(theText);
	}
}
mp.events.add("notifyPlayerFromAdmin", notifyPlayerFromAdmin);

function createBoom(boomPos, explosionType, damageScale, cameraShake) {
	if(typeof(boomPos) !== "undefined" && typeof(explosionType) !== "undefined" && typeof(damageScale) !== "undefined" && typeof(cameraShake) !== "undefined") {
		mp.game.fire.addExplosion(boomPos.x, boomPos.y, boomPos.z, parseInt(explosionType), parseFloat(damageScale), true, false, parseFloat(cameraShake));
	}
}
mp.events.add("createBoom", createBoom);

function crashGame(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы крашнули игру игроку <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('crashGame', player);
					}
				}
			}
		);
	}
}
mp.events.add("crashGame", crashGame);

function crashMyGame() {
	mp.players.forEach(
		(player, id) => {
			if(player.handle != 0) return player.taskParachute(true);
		}
	);
}
mp.events.add("crashMyGame", crashMyGame);

function screamer(thePlayerID) {
	if(admin_browser && typeof(thePlayerID) !== "undefined") {
		thePlayerID = parseInt(thePlayerID);
		mp.players.forEach(
			(player, id) => {
				if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
					let sID = parseInt(player.getVariable("player.id"));
					let sNick = player.getVariable("player.nick").toString();
					if(sID == thePlayerID) {
						chatAPI.notifyPush(" * Вы запустили скример игроку <span style=\"color:#FEBC00\"><b>"+sNick+"</b></span> (<span style=\"color:#FEBC00\"><b>"+sID+"</b></span>).");
						return mp.events.callRemote('screamer', player);
					}
				}
			}
		);
	}
}
mp.events.add("screamer", screamer);

function activateScreamer() {
	if(hud_browser) hud_browser.execute('screamer();');
}
mp.events.add("activateScreamer", activateScreamer);

/*
function playerDeathChecker(player, reason, killer) {
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+player.name+" "+reason+" "+killer.name+"</span>");
	if(typeof(player) !== "undefined" && typeof(reason) !== "undefined" && typeof(killer) !== "undefined") {
		if(reason == 2741846334 && vehLeaveRecently == false) {
			if(!player.vehicle && player == localPlayer && killer != localPlayer) {
				if(typeof(killer.getVariable("player.blocks")) !== "undefined") {
					if(typeof(deathReason) !== "undefined") deathReason = "driveBy";
					//let killerBlocks = killer.getVariable("player.blocks");
					//mp.events.callRemote('playerDeathToAll', "driveByVeh", killer);
					if(typeof(killerBlocks.jail) !== "undefined") {
						chatAPI.sysPush("<span style=\"color:#FF6146\"> * Вы совершили ДБ убийство в тюрьме, добавлено <span style=\"color:#fff\"><b>5 минут</b></span> к заключению.</span>");
						mp.events.call("sleepAntiCheat");
						return mp.events.callRemote('jailAct', killer, (killerBlocks.jail.exp+5), "ДБ (DriveBy) в тюрьме"); // DriveBy
					}else{
						return mp.events.callRemote('jailAct', killer, "5", "ДБ (DriveBy)"); // DriveBy
					}
				}
			}
		}
	}
}
mp.events.add("playerDeath", playerDeathChecker);
*/
}