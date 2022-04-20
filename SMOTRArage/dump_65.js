{
var afToggleTablet = false;
var myTablet = false;

mp.keys.bind(0x28, true, function() { // стрелка вниз, планшет
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x28)) return false;
	
	if(afToggleTablet) return false;
	afToggleTablet = true;
	setTimeout(function() { afToggleTablet = false }, 500);
	if(hud_browser) {
		if(!myTablet) {
			myTablet = true;
			
			let specialApps = "false";
			if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
				let myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.name) !== "undefined") specialApps = myFraction.name;
			}
			
			hud_browser.execute('togglePlayerTablet(\'{"name":"tabletMainActivity"}\',\''+specialApps+'\');');
			mp.gui.cursor.visible = true;
			allowBinds = [0x28];
			mp.game.graphics.startScreenEffect("MenuMGHeistTint", 0, true);
		}else{
			mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
			hud_browser.execute("togglePlayerTablet();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			myTablet = false;
		}
	}
});

function myTabletOff() {
	if(hud_browser) {
		if(myTablet) {
			mp.game.graphics.stopScreenEffect("MenuMGHeistTint");
			hud_browser.execute("togglePlayerTablet();");
			mp.gui.cursor.visible = false;
			restoreBinds();
			myTablet = false;
		}
	}
}

// Ads App

mp.events.add("openCreatingAd", () => {
	if(hud_browser && typeof(localPlayer.getVariable('player.id')) !== "undefined") {
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
			let playerBlocks = localPlayer.getVariable("player.blocks");
			if(typeof(playerBlocks.jail) !== "undefined") return hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdsActivity"}\');myTabletError("#adsAppAddBut","Вы в тюрьме");');
			if(typeof(playerBlocks.mute) !== "undefined") return hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdsActivity"}\');myTabletError("#adsAppAddBut","У Вас заглушка");');
			if(typeof(playerBlocks.mins) === "undefined") return hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdsActivity"}\');myTabletError("#adsAppAddBut","У Вас менее 10 часов игры");');
			if(parseInt(playerBlocks.mins) < 600) return hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdsActivity"}\');myTabletError("#adsAppAddBut","У Вас менее 10 часов игры");');
		}
		
		let vehJSON = [];
		if(typeof(localPlayer.getVariable('player.vehs')) !== "undefined") {
			vehJSON = localPlayer.getVariable('player.vehs');

			for(let k in vehJSON.vehicles) {
				let vehHash = vehJSON.vehicles[k].hash;
				let vehName = vehHash;
				let vehType = "vehicle";
				
				let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
				decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
				
				if(typeof(decVehStats[0][vehHash]) != "undefined") {
					vehName = decVehStats[0][vehHash].name;
					vehType = decVehStats[0][vehHash].type;
				}
				vehJSON.vehicles[k].name = vehName;
				vehJSON.vehicles[k].type = vehType;
				vehJSON.vehicles[k].inv = {};
			}
		}
		let housesJSON = [];
		if(typeof(localPlayer.getVariable("player.houses")) !== "undefined") {
			if(typeof(localPlayer.getVariable("player.houses").houses) !== "undefined") {
				housesJSON = localPlayer.getVariable("player.houses").houses;
				for(let k in housesJSON) {
					if(typeof(housesJSON[k].pos) !== "undefined") {
						let getStreet = mp.game.pathfind.getStreetNameAtCoord(parseFloat(housesJSON[k].pos.x), parseFloat(housesJSON[k].pos.y), parseFloat(housesJSON[k].pos.z), 0, 0);
						let zoneName = mp.game.zone.getNameOfZone(parseFloat(housesJSON[k].pos.x), parseFloat(housesJSON[k].pos.y), parseFloat(housesJSON[k].pos.z));

						let realZoneName = "San Andreas";
						if(zoneNamesShort.includes(zoneName)) {
							let zoneID = zoneNamesShort.indexOf(zoneName);
							realZoneName = zoneNames[zoneID];
						}
						let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
						
						housesJSON[k]["address"] = realZoneName+", "+street+", "+housesJSON[k].id;
					}
				}
			}
		};
		let businessesJSON = [];
		if(typeof(localPlayer.getVariable("player.businesses")) !== "undefined") {
			if(typeof(localPlayer.getVariable("player.businesses").businesses) !== "undefined") {
				businessesJSON = localPlayer.getVariable("player.businesses").businesses;
				for(let k in businessesJSON) {
					if(typeof(businessesJSON[k].pos) !== "undefined") {
						let getStreet = mp.game.pathfind.getStreetNameAtCoord(parseFloat(businessesJSON[k].pos.x), parseFloat(businessesJSON[k].pos.y), parseFloat(businessesJSON[k].pos.z), 0, 0);
						let zoneName = mp.game.zone.getNameOfZone(parseFloat(businessesJSON[k].pos.x), parseFloat(businessesJSON[k].pos.y), parseFloat(businessesJSON[k].pos.z));

						let realZoneName = "San Andreas";
						if(zoneNamesShort.includes(zoneName)) {
							let zoneID = zoneNamesShort.indexOf(zoneName);
							realZoneName = zoneNames[zoneID];
						}
						let street = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
						
						businessesJSON[k]["address"] = realZoneName+", "+street+", "+businessesJSON[k].id;
					}
				}
			}
		};
		let invJSON = [];
		if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
			invJSON = localPlayer.getVariable("player.inv");
			
			for(let k in invJSON) {
				let dropData = invJSON[k];
				invJSON[k]["name"] = false;
				invJSON[k]["desc"] = "Нет описания предмета";
				invJSON[k]["img"] = "none";

				if(typeof(dropData.sex) !== "undefined") {
					if(typeof(allStuff[dropData.sex]) !== "undefined") {
						if(typeof(allStuff[dropData.sex][dropData.type]) !== "undefined") {
							let tempData = allStuff[dropData.sex][dropData.type];
							if(typeof(tempData[dropData.hash]) !== "undefined") {
								tempData = tempData[dropData.hash];
								if(typeof(tempData.name) !== "undefined") invJSON[k]["name"] = tempData.name;
								if(typeof(tempData.desc) !== "undefined") invJSON[k]["desc"] = tempData.desc;
								if(invJSON[k].type == "mask") {
									invJSON[k]["img"] = "mask";
								}else{
									if(dropData.sex == "male") {
										if(dropData.type == "head") invJSON[k]["img"] = "headMale";
										else if(dropData.type == "glasses") invJSON[k]["img"] = "glassesMale";
										else if(dropData.type == "tors") invJSON[k]["img"] = "torsMale";
										else if(dropData.type == "watch") invJSON[k]["img"] = "watchMale";
										else if(dropData.type == "bracelet") invJSON[k]["img"] = "braceletMale";
										else if(dropData.type == "pants") invJSON[k]["img"] = "pantsMale";
										else if(dropData.type == "shoes") invJSON[k]["img"] = "shoesMale";
									}else{
										if(dropData.type == "head") invJSON[k]["img"] = "headFemale";
										else if(dropData.type == "glasses") invJSON[k]["img"] = "glassesFemale";
										else if(dropData.type == "tors") invJSON[k]["img"] = "torsFemale";
										else if(dropData.type == "watch") invJSON[k]["img"] = "watchFemale";
										else if(dropData.type == "bracelet") invJSON[k]["img"] = "braceletFemale";
										else if(dropData.type == "pants") invJSON[k]["img"] = "pantsFemale";
										else if(dropData.type == "shoes") invJSON[k]["img"] = "shoesFemale";
									}
								}
							}
						}
					}
				}else{
					if(typeof(allStuff[dropData.type]) !== "undefined") {
						if(typeof(allStuff[dropData.type][dropData.hash]) !== "undefined") {
							let tempData = allStuff[dropData.type][dropData.hash];
							if(typeof(tempData.name) !== "undefined") invJSON[k]["name"] = tempData.name;
							if(typeof(tempData.desc) !== "undefined") invJSON[k]["desc"] = tempData.desc;
							if(dropData.type == "mask") invJSON[k]["img"] = "mask";
							else invJSON[k]["img"] = dropData.hash;
						}
					}
				}
				
				if(!invJSON[k]["name"]) invJSON[k] = undefined;
			}
			
			invJSON = JSON.parse(JSON.stringify(invJSON));
		}
		
		//chatAPI.sysPush('Test');
		//chatAPI.sysPush(JSON.stringify(housesJSON));
		//chatAPI.sysPush('Test');
		//chatAPI.sysPush(JSON.stringify(businessesJSON));
		//chatAPI.sysPush(JSON.stringify(invJSON));
		let myID = localPlayer.getVariable('player.id');
		hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdCreateActivity","content":{"myID":"'+myID+'","vehs":'+JSON.stringify(vehJSON.vehicles)+',"houses":'+JSON.stringify(housesJSON)+',"businesses":'+JSON.stringify(businessesJSON)+',"inv":'+JSON.stringify(invJSON)+',"photos":'+JSON.stringify(phoneImageGallery)+'}}\')');
	}
});

mp.events.add("adsAd", (data, cost) => {
	if(hud_browser && typeof(data) !== "undefined" && typeof(cost) !== "undefined") {
		data = JSON.parse(data);
		if(typeof(data.adID) === "undefined") return hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdCreateActivity"}\');myTabletError("#adsAdAppBut","Ошибка инициализации, попробуйте позже");');
		mp.events.callRemote('adsAd', JSON.stringify(data), cost.toString());
	}
});

mp.events.add("addingAdResult", (result, reason) => {
	if(hud_browser && typeof(result) !== "undefined") {
		if(result) hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdAddedActivity","result":'+result+'}\');');
		else if(typeof(reason) !== "undefined") hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdCreateActivity"}\');myTabletError("#adsAdAppBut","'+reason+'");');
	}
});

mp.events.add("deleteAd", (adCAT, adID) => {
	if(hud_browser && typeof(adCAT) !== "undefined" && typeof(adID) !== "undefined") mp.events.callRemote('deleteAd', adCAT.toString(), adID.toString());
});

mp.events.add("deleteAdResult", (result) => {
	if(hud_browser && typeof(result) !== "undefined") hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdDeletedActivity","result":"'+result+'"}\');');
});

let adsBrowsePage = 1;
mp.events.add("openAdsCat", (category, subcat, page) => {
	if(hud_browser && typeof(category) !== "undefined" && typeof(subcat) !== "undefined" && typeof(page) !== "undefined") {
		if(category == "transport" || category == "property" || category == "stuff" || category == "other") {
			mp.events.callRemote('loadAds', category, subcat, page);
		}else if(category == "myAds") {
			mp.events.callRemote('loadAds', category, subcat, page);
		}
	}
});

mp.events.add("adsLoaded", (category, subcat, countAds, ads, page) => {
	if(hud_browser && typeof(category) !== "undefined" && typeof(countAds) !== "undefined" && typeof(ads) !== "undefined" && typeof(page) !== "undefined") {
		if(typeof(subcat) === "undefined") subcat = false;
		hud_browser.execute('togglePlayerTablet(\'{"name":"tabletAdBrowseActivity","cat":"'+category+'","subcat":"'+subcat+'","content":'+ads+',"countads":'+countAds+',"page":'+page+'}\')');
	}
});

// Кейсы

mp.events.add("openCasesCat", (category) => {
	if(hud_browser && typeof(category) !== "undefined") {
		//if(category == "bomj" || category == "normal" || category == "premium" || category == "elite") mp.events.callRemote('loadCases', category);
		let content = {};
		
		chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+category+"</span>");
		hud_browser.execute('togglePlayerTablet(\'{"name":"tabletCaseBrowseActivity","cat":"'+category+'","content":'+JSON.stringify(content)+'}\')');
	}
});

// Gallery App
/*
var phoneImageGallery = [];

mp.events.add("initPhoneGallery", (data) => {
	if(hud_browser && typeof(data) !== "undefined") {
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+data+"</span>");
		phoneImageGallery = JSON.parse(data);
		if(typeof(mp.storage.data.phonegallery) !== "undefined") {
			phoneImageGallery = phoneImageGallery.sort((b, a) => parseFloat(a.key) - parseFloat(b.key));
			if(typeof(mp.storage.data.phonegallery.cur) === "undefined") {
				if(Object.keys(phoneImageGallery).length > 0) mp.storage.data.phonegallery = {"cur":Object.keys(phoneImageGallery).length};
				else mp.storage.data.phonegallery = {"cur":1};
			}
		}else{
			phoneImageGallery = phoneImageGallery.sort((b, a) => parseFloat(a.key) - parseFloat(b.key));
			if(Object.keys(phoneImageGallery).length > 0) mp.storage.data.phonegallery = {"cur":Object.keys(phoneImageGallery).length};
			else mp.storage.data.phonegallery = {"cur":1};
		}
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(phoneImageGallery)+"</span>");
	}
});
*/
}