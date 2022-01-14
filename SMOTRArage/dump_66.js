{
let afTickets = false;
mp.events.add('playerEnterColshape', (shape) => {
	if(shape) {
		if(typeof(shape.data) === 'undefined' && typeof(shape.id) !== "undefined") {
			if(typeof(shape.getVariable('col.type')) !== "undefined") {
				let colType = shape.getVariable('col.type');
				if(colType == 'ticket_camera' && typeof(shape.getVariable('col.data')) !== "undefined") {
					if(localPlayer.vehicle && vehSeat == -1 && typeof(localPlayer.getVariable("player.tickets")) !== "undefined") {
						if(afTickets) return false;
						
						if(typeof(curCourierTask) !== "undefined") {
							if(typeof(curCourierTask.workTimer) !== "undefined") return false;
						}
						
						let theVeh = localPlayer.vehicle;
						
						if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
							if(theVeh.getVariable("veh.hash") == "s_p450") return false;
						}
						
						let colData = shape.getVariable('col.data');
						
						let vehClass = theVeh.getClass().toString();
						if(vehClass == "0" || parseInt(vehClass) <= 12 || (parseInt(vehClass) >= 17 && parseInt(vehClass) <= 20)) {
							if(typeof(theVeh.getVariable("veh.num")) !== "undefined") {
								let vehNum = str_replace_all(theVeh.getVariable("veh.num"), " ", "");
								vehNum = explode("|", vehNum);
			
								let speed = roundNumber(theVeh.getSpeed() * 3.6, 0);
								let maxSpeed = colData.maxSpeed;
								
								let isRemen = true;
								if(localPlayer.getConfigFlag(32, true) && vehClass != "8") isRemen = false;
								
								if(speed-10 > maxSpeed) {
									let ticketData = {};
									ticketData["speed"] = speed;
									ticketData["maxSpeed"] = maxSpeed;
									ticketData["cost"] = 2500;
									if(speed-maxSpeed >= 60) ticketData["cost"] = 10000;
									else if(speed-maxSpeed >= 40) ticketData["cost"] = 7500;
									else if(speed-maxSpeed >= 20) ticketData["cost"] = 5000;
									
									ticketData["isRemen"] = "1";
									if(!isRemen) {
										ticketData["isRemen"] = "0";
										ticketData["cost"] = ticketData["cost"]+1000;
									}
									
									mp.events.callRemote('newTicket', ticketData["cost"].toString());
									ticketData["cost"] = ticketData["cost"].toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
									
									let myPos = localPlayer.position;
									let getStreet = mp.game.pathfind.getStreetNameAtCoord(myPos.x, myPos.y, myPos.z, 0, 0);
									let zoneName = mp.game.zone.getNameOfZone(myPos.x, myPos.y, myPos.z);

									let realZoneName = "San Andreas";
									if(zoneNamesShort.includes(zoneName)) {
										let zoneID = zoneNamesShort.indexOf(zoneName);
										realZoneName = zoneNames[zoneID];
									}
									
									let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
									ticketData["photoLocation"] = realZoneName+", "+street;
									
									let month = curMonth;
									if(month == 1) month = "янв";
									else if(month == 2) month = "фев";
									else if(month == 3) month = "мар";
									else if(month == 4) month = "апр";
									else if(month == 5) month = "мая";
									else if(month == 6) month = "июня";
									else if(month == 7) month = "июля";
									else if(month == 8) month = "авг";
									else if(month == 9) month = "сен";
									else if(month == 10) month = "окт";
									else if(month == 11) month = "ноя";
									else if(month == 12) month = "дек";
									
									let hours = curHours;
									let minutes = curMinutes;
									if(hours < 10) hours = "0"+hours;
									if(minutes < 10) minutes = "0"+minutes;
									
									ticketData["dateTime"] = curDay+" "+month+" "+curYear+", "+hours+":"+minutes;
									
									ticketData["number"] = false;
									if(theVeh.getVariable("veh.num") != "theMoto") {
										if(Object.keys(vehNum).length > 0 && typeof(vehNum[1]) !== "undefined") ticketData["number"] = {"body":vehNum[0],"region":vehNum[1]};
									}else{
										ticketData["number"] = theVeh.getVariable("veh.num");
									}
									mp.gui.takeScreenshot("vehTicket.jpg", 0, 25, 100);
									if(hud_browser) hud_browser.execute('giveTicket(\''+JSON.stringify(ticketData)+'\');');
									mp.game.graphics.startScreenEffect("MinigameTransitionOut", 1500, false);
									mp.game.graphics.startScreenEffect("HeistLocate", 1500, false);
									
									afTickets = true;
									setTimeout(function() {
										if(hud_browser) hud_browser.execute("giveTicket();");
										afTickets = false;
										mp.game.ui.notifications.showWithPicture("Полиция штата", "~w~Штраф~r~"+ticketData["cost"]+" ~w~руб.", "~w~Всего~r~"+localPlayer.getVariable("player.tickets").toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.~n~Оплата в любом АТМ.", "CHAR_CALL911", 1, false, 1, 2);
									}, 10000);
								}else if(!isRemen) {
									let ticketData = {};
									ticketData["speed"] = speed;
									ticketData["maxSpeed"] = maxSpeed;
									ticketData["cost"] = 1000;
									ticketData["isRemen"] = "2";
									
									mp.events.callRemote('newTicket', ticketData["cost"].toString());
									ticketData["cost"] = ticketData["cost"].toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
									
									let myPos = localPlayer.position;
									let getStreet = mp.game.pathfind.getStreetNameAtCoord(myPos.x, myPos.y, myPos.z, 0, 0);
									let zoneName = mp.game.zone.getNameOfZone(myPos.x, myPos.y, myPos.z);

									let realZoneName = "San Andreas";
									if(zoneNamesShort.includes(zoneName)) {
										let zoneID = zoneNamesShort.indexOf(zoneName);
										realZoneName = zoneNames[zoneID];
									}
									
									let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
									ticketData["photoLocation"] = realZoneName+", "+street;
									
									let month = curMonth;
									if(month == 1) month = "янв";
									else if(month == 2) month = "фев";
									else if(month == 3) month = "мар";
									else if(month == 4) month = "апр";
									else if(month == 5) month = "мая";
									else if(month == 6) month = "июня";
									else if(month == 7) month = "июля";
									else if(month == 8) month = "авг";
									else if(month == 9) month = "сен";
									else if(month == 10) month = "окт";
									else if(month == 11) month = "ноя";
									else if(month == 12) month = "дек";
									
									let hours = curHours;
									let minutes = curMinutes;
									if(hours < 10) hours = "0"+hours;
									if(minutes < 10) minutes = "0"+minutes;
									
									ticketData["dateTime"] = curDay+" "+month+" "+curYear+", "+hours+":"+minutes;
									
									ticketData["number"] = false;
									if(theVeh.getVariable("veh.num") != "theMoto") {
										if(Object.keys(vehNum).length > 0 && typeof(vehNum[1]) !== "undefined") ticketData["number"] = {"body":vehNum[0],"region":vehNum[1]};
									}else{
										ticketData["number"] = theVeh.getVariable("veh.num");
									}
									mp.gui.takeScreenshot("vehTicket.jpg", 0, 25, 100);
									if(hud_browser) hud_browser.execute('giveTicket(\''+JSON.stringify(ticketData)+'\');');
									mp.game.graphics.startScreenEffect("MinigameTransitionOut", 1500, false);
									mp.game.graphics.startScreenEffect("HeistLocate", 1500, false);
									
									afTickets = true;
									setTimeout(function() {
										if(hud_browser) hud_browser.execute("giveTicket();");
										afTickets = false;
										mp.game.ui.notifications.showWithPicture("Полиция штата", "~w~Штраф~r~"+ticketData["cost"]+" ~w~руб.", "~w~Всего~r~"+localPlayer.getVariable("player.tickets").toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" ~w~руб.~n~Оплата в любом АТМ.", "CHAR_CALL911", 1, false, 1, 2);
									}, 10000);
								}
							}
						}
					}
					return false;
				}
			}
		}
	}
});
}즳Ā