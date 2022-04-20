{
var imInZone = false;

var hexZoneColors = {
	"1":{"color":"#E13B3B"},
	"2":{"color":"#79CE79"},
	"3":{"color":"#64B8E7"},
	"4":{"color":"#F1F1F1"},
	"5":{"color":"#EFCA57"},
	"6":{"color":"#C65859"},
	"7":{"color":"#A074B3"},
	"8":{"color":"#FF81C8"},
	"9":{"color":"#F6A480"},
	"10":{"color":"#B6968B"},
	"11":{"color":"#91CFAA"},
	"12":{"color":"#78ADB3"},
	"13":{"color":"#D4D2E7"},
	"14":{"color":"#94849E"},
	"15":{"color":"#71C8C1"},
	"16":{"color":"#D8C69E"},
	"17":{"color":"#EC9259"},
	"18":{"color":"#9ECDEB"},
	"19":{"color":"#B6698D"},
	"20":{"color":"#94917F"},
	"21":{"color":"#AA7B67"},
	"22":{"color":"#B4AAAC"},
	"23":{"color":"#E9939F"},
	"24":{"color":"#BED863"},
	"25":{"color":"#16815C"},
	"26":{"color":"#80C7FF"},
	"27":{"color":"#AE44E7"},
	"28":{"color":"#D0AC18"},
	"29":{"color":"#4E69B1"},
	"30":{"color":"#34A9BB"},
	"31":{"color":"#BDA184"},
	"32":{"color":"#CCE1FE"},
	"33":{"color":"#F1F19B"},
	"34":{"color":"#ED90A3"},
	"35":{"color":"#F98E8E"},
	"36":{"color":"#FDF0AA"},
	"37":{"color":"#F1F1F1"},
	"38":{"color":"#3675BC"},
	"39":{"color":"#9F9F9F"},
	"40":{"color":"#555555"},
	"41":{"color":"#F19D9D"},
	"42":{"color":"#6DB8D6"},
	"43":{"color":"#AFEDAE"},
	"44":{"color":"#FEA65F"},
	"45":{"color":"#F0F0F0"},
	"46":{"color":"#EBEF28"},
	"47":{"color":"#FE9917"},
	"48":{"color":"#F745A5"},
	"49":{"color":"#E03A3A"},
	"50":{"color":"#896CE2"},
	"51":{"color":"#FE8A5B"},
	"52":{"color":"#426D42"},
	"53":{"color":"#B2DDF2"},
	"54":{"color":"#39647A"},
	"55":{"color":"#9F9F9F"},
	"56":{"color":"#837232"},
	"57":{"color":"#65B9E7"},
	"58":{"color":"#4B4176"},
	"59":{"color":"#E03A3A"},
	"60":{"color":"#F0CB58"},
	"61":{"color":"#CE3F99"},
	"62":{"color":"#CECECE"},
	"63":{"color":"#286B9E"},
	"64":{"color":"#D77A1A"},
	"65":{"color":"#8E8393"},
	"66":{"color":"#F0CB57"},
	"67":{"color":"#64B9E7"},
	"68":{"color":"#65B9E7"},
	"69":{"color":"#79CD79"},
	"70":{"color":"#F0CB57"},
	"71":{"color":"#F0CB58"},
	"72":{"color":"#000000"},
	"73":{"color":"#EFCA57"},
	"74":{"color":"#64B9E7"},
	"75":{"color":"#E03A3A"},
	"76":{"color":"#782424"},
	"77":{"color":"#65B8E6"},
	"78":{"color":"#3A647A"},
	"79":{"color":"#E13B3B"},
	"80":{"color":"#65B9E6"},
	"81":{"color":"#F2A30C"},
	"82":{"color":"#A4CBA9"},
	"83":{"color":"#A753F1"},
	"84":{"color":"#65B8E6"},
	"85":{"color":"#000000"}
}

var clanCapters = [];

function refreshCapters(newValue) {
	if(typeof(newValue) !== "undefined") clanCapters = newValue;
	else if(typeof(mp.world.data.capters) !== "undefined") clanCapters = mp.world.data.capters;
	//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * "+Object.keys(clanCapters).length+" | "+JSON.stringify(clanCapters)+"</span>");
}

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "capters") refreshCapters();
});

var clanZones = false;
/*
var clanZones = {
	"port":{"pos":new mp.Vector3(1017.3205,-3114.0554,5.9008),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":240,"blip":false,"marker":false,"check":false},
	"prom_zone":{"pos":new mp.Vector3(915.6882,-2270.1589,30.5534),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":200,"blip":false,"marker":false,"check":false},
	"prom_zone2":{"pos":new mp.Vector3(947.757,-1901.9379,31.2251),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":165,"blip":false,"marker":false,"check":false},
	"gasneft":{"pos":new mp.Vector3(1710.4633,-1678.4237,112.5605),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":240,"blip":false,"marker":false,"check":false},
	"utilization":{"pos":new mp.Vector3(1579.5038,-2181.2817,77.3682),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":240,"blip":false,"marker":false,"check":false},
	"burro_hitz":{"pos":new mp.Vector3(1295.1827,-1794.2158,47.1485),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":115,"blip":false,"marker":false,"check":false},
	"rancho_inno":{"pos":new mp.Vector3(479.0005,-1659.7737,29.2475),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":200,"blip":false,"marker":false,"check":false},
	"devis_strip":{"pos":new mp.Vector3(143.0299,-1435.9399,29.2884),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":200,"blip":false,"marker":false,"check":false},
	"groove":{"pos":new mp.Vector3(-11.8437,-1804.2772,27.2937),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":200,"blip":false,"marker":false,"check":false},
	"under_groove":{"pos":new mp.Vector3(-200.2635,-1510.7063,31.6289),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":150,"blip":false,"marker":false,"check":false},
	"vagos":{"pos":new mp.Vector3(317.7193,-2027.3,20.6397),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":200,"blip":false,"marker":false,"check":false},
	"arena":{"pos":new mp.Vector3(-290.3223,-1965.6022,25.561),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":120,"blip":false,"marker":false,"check":false},
	"la_puerta":{"pos":new mp.Vector3(-1084.6169,-1538.6398,4.5783),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":150,"blip":false,"marker":false,"check":false},
	"vesp_cannals":{"pos":new mp.Vector3(-1018.6486,-1063.6232,-1.0727),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":150,"blip":false,"marker":false,"check":false},
	"little_seoul":{"pos":new mp.Vector3(-634.2243,-1137.4353,10.5785),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":130,"blip":false,"marker":false,"check":false},
	"carrier":{"pos":new mp.Vector3(2969.8784,2853.8699,54.699),"own":{"id":0,"name":"false","color":"4"},"rot":0,"radius":240,"blip":false,"marker":false,"check":false}
};
*/

function refreshZones(newValue) {
	if(typeof(newValue) !== "undefined") {
		if(!clanZones) {
			for (var i in newValue) {
				let tempZone = newValue[i];
				
				let blip = mp.blips.new(9, new mp.Vector3(tempZone.pos.x, tempZone.pos.y, tempZone.pos.z),
				{
					scale: 1,
					color: tempZone.own.color,
					alpha: 50,
					shortRange: true,
					rotation: tempZone.rot,
					dimension: 0,
					radius: tempZone.radius
				});
				tempZone.blip = blip;
				
				let blipInfo = mp.blips.new(674, new mp.Vector3(tempZone.pos.x, tempZone.pos.y, tempZone.pos.z),
				{
					name: "Территория банды "+tempZone.own.name,
					scale: 1.9,
					color: tempZone.own.color,
					alpha: 100,
					shortRange: true,
					dimension: 0
				});
				blipInfo.setCategory(11);
				tempZone.blipInfo = blipInfo;
				
				let rgbColor = [255, 255, 255, 0];
				if(typeof(tempZone.war.id) !== "undefined" && typeof(hexZoneColors[tempZone.own.color].color) !== "undefined") rgbColor = [hexToRgb(hexZoneColors[tempZone.own.color].color).r, hexToRgb(hexZoneColors[tempZone.own.color].color).g, hexToRgb(hexZoneColors[tempZone.own.color].color).b, 100];
				
				let marker = mp.markers.new(28, new mp.Vector3(tempZone.pos.x, tempZone.pos.y, tempZone.pos.z), tempZone.radius,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 180, 0),
					color: rgbColor,
					visible: true,
					dimension: 0
				});
				tempZone.marker = marker;
				
				/*mp.markers.new(28, new mp.Vector3(tempZone.pos.x, tempZone.pos.y, tempZone.pos.z), tempZone.radius, // DEBUG
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 180, 0),
					color: [0, 0, 200, 50],
					visible: true,
					dimension: 0
				});*/

				tempZone.shape = mp.colshapes.newSphere(parseFloat(tempZone.pos.x), parseFloat(tempZone.pos.y), parseFloat(tempZone.pos.z), parseFloat(tempZone.radius), 0);
			}
			clanZones = newValue;
		}else{
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(tempZone) {
					if(typeof(tempZone.own) !== "undefined") {
						let tempNewVaule = newValue[i];
						if(mp.blips.exists(tempZone.blip)) tempZone.blip.destroy();
						if(mp.blips.exists(tempZone.blipInfo)) tempZone.blipInfo.destroy();
						if(mp.markers.exists(tempZone.marker)) tempZone.marker.destroy();
						
						tempZone.own = tempNewVaule.own;
						tempZone.war = tempNewVaule.war;
						
						let blip = mp.blips.new(9, new mp.Vector3(tempNewVaule.pos.x, tempNewVaule.pos.y, tempNewVaule.pos.z),
						{
							scale: 1,
							color: tempNewVaule.own.color,
							alpha: 50,
							shortRange: true,
							rotation: tempNewVaule.rot,
							dimension: 0,
							radius: tempNewVaule.radius
						});
						tempZone.blip = blip;
						
						let blipInfo = mp.blips.new(674, new mp.Vector3(tempNewVaule.pos.x, tempNewVaule.pos.y, tempNewVaule.pos.z),
						{
							name: "Территория банды "+tempNewVaule.own.name,
							scale: 1.9,
							color: tempZone.own.color,
							alpha: 100,
							shortRange: true,
							dimension: 0
						});
						blipInfo.setCategory(11);
						tempZone.blipInfo = blipInfo;
						
						let rgbColor = [255, 255, 255, 0];
						if(typeof(tempNewVaule.war.id) !== "undefined" && typeof(hexZoneColors[tempNewVaule.own.color].color) !== "undefined") rgbColor = [hexToRgb(hexZoneColors[tempNewVaule.own.color].color).r, hexToRgb(hexZoneColors[tempNewVaule.own.color].color).g, hexToRgb(hexZoneColors[tempNewVaule.own.color].color).b, 100];
						
						let marker = mp.markers.new(28, new mp.Vector3(tempNewVaule.pos.x, tempNewVaule.pos.y, tempNewVaule.pos.z), tempNewVaule.radius,
						{
							direction: new mp.Vector3(0, 0, 0),
							rotation: new mp.Vector3(0, 180, 0),
							color: rgbColor,
							visible: true,
							dimension: 0
						});
						tempZone.marker = marker;
					}
				}
			}
		}
	}
}

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "zones") {
		if(typeof(newValue) !== "undefined") refreshZones(newValue);
	}
});

let flashVector = 1;
setInterval(function() {
	if(clanZones) {
		if(Object.keys(clanZones).length > 0) {
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(typeof(tempZone.war) !== "undefined") {
					if(tempZone.war) {
						if(typeof(tempZone.war.id) !== "undefined") {
							let getBlipAlpha = tempZone.blip.getAlpha();
							if(flashVector == 1) {
								if(getBlipAlpha > 0) {
									tempZone.blip.setAlpha(getBlipAlpha-10);
								}else{
									flashVector = 2;
								}
							}else if(flashVector == 2) {
								if(getBlipAlpha < 100) tempZone.blip.setAlpha(getBlipAlpha+10);
								else flashVector = 1;
							}
						}
					}
				}
			}
		}
	}
}, 150);

var afCaptButton = false;
function fracCapt() {
	if(hud_browser) {
		let myFraction = {}
		if(typeof(localPlayer.getVariable("player.id")) !== "undefined" && typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			if(!clanZones) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Территории временно недоступны\');');
			if(localPlayer.getVariable("player.fraction")) {
				myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.id) === "undefined" || typeof(myFraction.name) === "undefined" || typeof(myFraction.rank) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Вы не можете начать капт\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Капты не инициализированы\');');
				if(typeof(mp.world.data.fractions[myFraction.id].settings) === "undefined") return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Капты не инициализированы\');');
				
				let fractionData = mp.world.data.fractions[myFraction.id];
				let fracSettings = mp.world.data.fractions[myFraction.id].settings;
				
				if(typeof(fracSettings[myFraction.rank.toString()].captGangs) === "undefined") hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Вашему рангу недоступно\');');
				
				if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
					let fraction = mp.world.data.fractions[myFraction.id];
					
					/*let countDownTimer = 5000;
					let zonesCounter = 0;
					for (var i in clanZones) {
						let tempZone = clanZones[i];
						if(tempZone.own.id.toString() == myFraction.id.toString()) zonesCounter++;
					}
					countDownTimer = countDownTimer * zonesCounter;*/
					
					if(typeof(mp.world.data.capters[myFraction.id]) !== "undefined") return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Вы уже подали заявку на капт\');');
					
					if(afCaptButton) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Слишком частые нажатия, '+(2500/1000)+' сек.\');');
					afCaptButton = true;
					setTimeout(function() { afCaptButton = false }, 2500);
				}else{
					return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Организация не инициализирована\');');
				}
				
				if(!imInZone) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Вы не на территории\');');
				
				if(typeof(mp.world.data.zones[imInZone]) !== "undefined") {
					let tempZone = mp.world.data.zones[imInZone];
					let myPos = localPlayer.position;
					if(tempZone.own.id.toString() == myFraction.id.toString()) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Это территория Вашей организации\');');
					
					/*let zonesCounter = 0;
					for (var i in clanZones) {
						let tempZone1 = clanZones[i];
						if(tempZone1.own.id.toString() == myFraction.id.toString()) zonesCounter++;
					}
					if(zonesCounter >= 6) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'У Вашей организации уже есть 6 территорий\');');*/
					
					let gangMans = [];
					let counter = 0;
					mp.players.forEach(
						(player, id) => {
							if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined" && typeof(player.getVariable("player.status")) !== "undefined" && typeof(player.getVariable("player.blocks")) !== "undefined") {
								if(typeof(player.getVariable("player.fraction")) !== "undefined") {
									let playerFraction = player.getVariable("player.fraction");
									if(typeof(playerFraction.id) !== "undefined") {
										if(myFraction.id.toString() == playerFraction.id.toString()) {
											gangMans.push(player.getVariable("player.id"));
											counter++;
										}
									}
								}
							}
						}
					);
					
					if(counter < 5) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Минимальный онлайн для капта 5 чел.\');');
					
					//if(mp.game.gameplay.getDistanceBetweenCoords(myPos.x, myPos.y, myPos.z, tempZone.pos.x, tempZone.pos.y, tempZone.pos.z, true) > 65) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Сместитесь ближе к центру\');');
					if(!fractionAction) mp.events.callRemote('fracCapt', myFraction.id, imInZone, JSON.stringify(gangMans));
					fractionAction = true;
				}else{
					return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Территория недоступна\');');
				}
			}
		}
	}
}
mp.events.add("fracCapt", fracCapt);

function youAreStartCapt() {
	if(hud_browser) hud_browser.execute('fractionEnableWorkZones();');
	if(fracPanel) closeFracMenu();
	if(fractionAction) fractionAction = false;
}
mp.events.add("youAreStartCapt", youAreStartCapt);

mp.events.add("zoneCaptError", (reason) => {
	if(typeof(reason) !== "undefined") {
		fractionAction = false;
		return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \''+reason+'\');');
	}
});

mp.events.add("zoneCaptElectionFault", () => {
	notyAPI.error("Капта не будет <b>что-то пошло не так</b>.", 3000, true);
	notyAPI.info("Выйгравший в голосовании клан-участник <b>не смог организоваться</b>!", 4500, false);
	if(warClanElectionActive) warClanElectionActive = false;
});

mp.events.add("zoneCaptElectionOK", () => {
	fractionAction = false;
	if(fracPanel) closeFracMenu();
	notyAPI.success("Ваш клан зарегистрирован на участие <b>в капте</b>!", 3000, true);
	notyAPI.info("Чей клан наберёт больше голосов <b>тот и будет учавствовать</b>!", 4500, false);
	//mp.game.ui.messages.showMidsizedShard("~w~Вы зарегистрировались на капт", "~s~Капт может начаться в течении минуты, удачи в голосовании!", 5, false, true, 8000);
	//if(warClanElectionActive) warClanElectionActive = false;
});

mp.events.add("youFractionAreCapturedZone", () => {
	notyAPI.success("Ваша организация захватила <b>новую территорию</b>!", 3000, true);
	mp.game.ui.messages.showMidsizedShard("~w~Захвачена ~y~территория", "~s~Ваша организация расширяется, поздравляем!", 5, false, true, 8000);
	if(warClanElectionActive) warClanElectionActive = false;
});

function captDefused(captEnemyName, captEnemyColor, ownKills, warKills) {
	if(typeof(captEnemyName) !== "undefined" && typeof(captEnemyColor) !== "undefined" && typeof(ownKills) !== "undefined" && typeof(warKills) !== "undefined") {
		notyAPI.success("Ваша организация отбила атаку от <b>"+captEnemyName+"</b>!", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Вы отбили атаку от "+gangColorsForRender[captEnemyColor]+captEnemyName, "~s~Победа со счётом "+ownKills+" - "+warKills+"!", 5, false, true, 8000);
		if(warClanElectionActive) warClanElectionActive = false;
	}
}
mp.events.add("captDefused", captDefused);

function captDefFailed(captEnemyName, captEnemyColor, ownKills, warKills) {
	if(typeof(captEnemyName) !== "undefined" && typeof(captEnemyColor) !== "undefined" && typeof(ownKills) !== "undefined" && typeof(warKills) !== "undefined") {
		notyAPI.error("Вашу территорию захватили <b>"+captEnemyName+"</b>!", 3000, true);
		mp.game.ui.messages.showMidsizedShard(gangColorsForRender[captEnemyColor]+captEnemyName+" ~w~захватили Вашу территорию!", "~s~Проигрыш со счётом "+ownKills+" - "+warKills+"!", 5, false, true, 8000);
		if(warClanElectionActive) warClanElectionActive = false;
		if(hud_browser) hud_browser.execute('playSound("zonelost", "0.03");');
	}
}
mp.events.add("captDefFailed", captDefFailed);

function captFailed(captEnemyName, captEnemyColor, ownKills, warKills) {
	if(typeof(captEnemyName) !== "undefined" && typeof(captEnemyColor) !== "undefined" && typeof(ownKills) !== "undefined" && typeof(warKills) !== "undefined") {
		notyAPI.error("Не получилось захватить территорию <b>"+captEnemyName+"</b>!", 3000, true);
		mp.game.ui.messages.showMidsizedShard(gangColorsForRender[captEnemyColor]+captEnemyName+" ~w~отбили территорию!", "~s~Проигрыш со счётом "+ownKills+" - "+warKills+"!", 5, false, true, 8000);
		if(warClanElectionActive) warClanElectionActive = false;
	}
}
mp.events.add("captFailed", captFailed);

function captSuccess(captEnemyName, captEnemyColor, ownKills, warKills) {
	if(typeof(captEnemyName) !== "undefined" && typeof(captEnemyColor) !== "undefined" && typeof(ownKills) !== "undefined" && typeof(warKills) !== "undefined") {
		notyAPI.success("Вы захватили территорию <b>"+captEnemyName+"</b>!", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Территория "+gangColorsForRender[captEnemyColor]+captEnemyName+" ~w~захвачена!", "~s~Победа со счётом "+ownKills+" - "+warKills+"!", 5, false, true, 8000);
		if(warClanElectionActive) warClanElectionActive = false;
		if(hud_browser) hud_browser.execute('playSound("zonecaptured", "0.03");');
	}
}
mp.events.add("captSuccess", captSuccess);

function youZoneCapturing(captEnemyName, captEnemyColor) {
	if(typeof(captEnemyName) !== "undefined" && typeof(captEnemyColor) !== "undefined") {
		notyAPI.success("<b>"+captEnemyName+"</b> начали захват Вашей территории!", 3000, true);
		mp.game.ui.messages.showMidsizedShard(""+gangColorsForRender[captEnemyColor]+captEnemyName+" ~w~захватывают Вас!", "~s~Срочно выдвигайтесь на территорию, её захватывают!", 5, false, true, 8000);
		if(warClanElectionActive) warClanElectionActive = false;
	}
}
mp.events.add("youZoneCapturing", youZoneCapturing);

function fractionZoneCaptStarted(captEnemyName, captEnemyColor) {
	if(typeof(captEnemyName) !== "undefined" && typeof(captEnemyColor) !== "undefined") {
		notyAPI.success("Ваша организация захватывает территорию <b>"+captEnemyName+"</b>!", 3000, true);
		mp.game.ui.messages.showMidsizedShard("~w~Начался захват "+gangColorsForRender[captEnemyColor]+captEnemyName, "~s~Срочно выдвигайтесь на территорию, помогите товарищам!", 5, false, true, 8000);
		if(warClanElectionActive) warClanElectionActive = false;
	}
}
mp.events.add("fractionZoneCaptStarted", fractionZoneCaptStarted);

var warClanElectionActive = false;
function warClanElection(ownID, ownName, ownColor) {
	if(typeof(ownID) !== "undefined" && typeof(ownName) !== "undefined" && typeof(ownColor) !== "undefined") {
		if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined" && typeof(curSeconds) !== "undefined") {
			let myBlocks = localPlayer.getVariable("player.blocks");
			if(typeof(myBlocks.fInvNewbieBlock) !== "undefined") {
				notyAPI.success("Ваш клан хочет начать войну с <b>"+ownName+"</b>!", 3000, true);
				let expDate = moment.duration(moment(myBlocks.fInvNewbieBlock).add(1,'day').diff(moment(curDay+"-"+curMonth+"-"+curYear+" "+curHours+":"+curMinutes+":"+curSeconds,"DD-MM-YYYY HH:mm:ss")));
				notyAPI.info("Вы сможете голосовать за войну через <b>"+expDate._data.hours+"</b> ч., <b>"+expDate._data.minutes+"</b> мин., <b>"+expDate._data.seconds+"</b> сек.", 4500, false);
				mp.game.ui.messages.showMidsizedShard("~w~Ваш клан хочет начать войну с "+gangColorsForRender[ownColor.toString()]+ownName, "~s~Доступ к голосованиям через "+expDate._data.hours+" ч., "+expDate._data.minutes+" мин., "+expDate._data.seconds+" сек.", 5, false, true, 8000);
			}else{
				warClanElectionActive = ownName;
				notyAPI.success("Ваш клан хочет начать войну с <b>"+ownName+"</b>!", 3000, true);
				notyAPI.info("Нажмите [ <b>F8</b> ], что бы проголосовать за войну!", 4500, false);
				mp.game.ui.messages.showMidsizedShard("~w~Ваш клан хочет начать войну с "+gangColorsForRender[ownColor.toString()]+ownName, "~s~Нажмите ( F8 ), что бы проголосовать за войну", 5, false, true, 8000);
			}
		}
	}
}
mp.events.add("warClanElection", warClanElection);

mp.keys.bind(0x77, true, function() { // F8 - Голосование
	if(!allowBinds || !Array.isArray(allowBinds)) return false;
	if(!allowBinds.includes(0x77)) return false;
	
	if(warClanElectionActive) {
		if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined") {
			let myFraction = localPlayer.getVariable("player.fraction");
			if(typeof(myFraction.id) !== "undefined") {
				notyAPI.success("Вы проголосовали за капт-войну с <b>"+warClanElectionActive+"</b>, спасибо!", 3000, true);
				mp.events.callRemote('warElectionVote', myFraction.id.toString());
			}
		}
		return warClanElectionActive = false;
	}
	
	if(typeof(globalAdmEvent) !== "undefined") {
		if(JSON.stringify(globalAdmEvent) != "{}") {
			if(premissionToGlobalAdmEvent) {
				premissionToGlobalAdmEvent = false;
				
				if(localPlayer.dimension != 0) return false;
				if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
					if(localPlayer.getVariable("active.deal")) return false;
				}
				if(typeof(localPlayer.getVariable("player.blocks")) != "undefined") {
					let playerBlocks = localPlayer.getVariable("player.blocks");
					if(typeof(playerBlocks.jail) !== "undefined") return false;
				}
				
				if(typeof(globalAdmEvent.maxMembers) !== "undefined") {
					if(parseInt(globalAdmEvent.maxMembers) <= parseInt(globalAdmEvent.members)) return notyAPI.error("Вы не успели подать <b>заявку на участие</b>, слишком много людей!", 3000, true);
				}
				
				mp.events.call("sleepAntiCheat");
				return mp.events.callRemote('globalAdmEventVote');
			}
		}
	}
});

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape) !== "undefined") {
		if(mp.colshapes.exists(shape) && typeof(clanZones) !== "undefined" && clanZones) {
			let tempZoneName = false;
			let tempZoneWarID = false;
			let tempZoneOwnID = false;
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(mp.colshapes.exists(tempZone.shape)) {
					if(tempZone.shape == shape) {
						tempZoneName = i
						tempZoneWarID = tempZone.war.id;
						tempZoneOwnID = tempZone.own.id;
						break;
					}
				}
			}
			if(tempZoneName) {
				imInZone = tempZoneName;
				
				if(imInZZ) imInZZ = false;
				if(typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
					if(localPlayer.getVariable("player.passive")) {
						mp.game.ui.messages.showMidsized("~r~Опасная ~w~зона", "~s~Выключаем пассивный режим, включить можно в телефоне.");
						mp.events.callRemote('togglePassive', false);
					}
				}
				
				if(typeof(localPlayer.getVariable("player.fraction")) !== "undefined" && typeof(localPlayer.getVariable("player.passive")) !== "undefined") {
					let myFraction = localPlayer.getVariable("player.fraction");
					//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * PASSIVE CHECKER</span>");
					if((tempZoneOwnID == myFraction.id || tempZoneWarID == myFraction.id) && localPlayer.getVariable("player.passive")) mp.events.callRemote('togglePassive', false);
				}
				
				//return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Enter: "+tempZoneName+"</span>");
			}
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape) !== "undefined") {
		if(mp.colshapes.exists(shape) && typeof(clanZones) !== "undefined" && clanZones) {
			for (var i in clanZones) {
				let tempZone = clanZones[i];
				if(mp.colshapes.exists(tempZone.shape)) {
					if(tempZone.shape == shape) {
						imInZone = false;
						break;
					}
				}
			}
			//return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Exit: "+checkpoint.zoneData.name+"</span>");
		}
	}
});

/*
var blipToMe = mp.blips.new(9, new mp.Vector3(0, 0, 0),
{
	scale: 1,
	color: 1,
	alpha: 175,
	shortRange: true,
	rotation: 50,
	dimension: 0,
	radius: 60.0
});

mp.events.add('render', () => {
	if(blipToMe.doesExist()) {
		blipToMe.setCoords(localPlayer.position);
	}
});
*/
}旙ꂆ