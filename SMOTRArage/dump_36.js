{
let oldFishingPos = false;
let posFishingWarns = 0;

function fishingStart() {
    if(fishingMode && hud_browser) {
		if(typeof(localPlayer.getVariable("player.inv")) === "undefined") return notyAPI.error("Инвентарь не инициализирован, рыбалка недоступна.", 3000, true);
		let myInv = localPlayer.getVariable("player.inv");
		if(typeof(myInv["instrument"]) !== "undefined") {
			if(parseInt(myInv["instrument"].health) <= 0) return notyAPI.error("Рыболовная снасть слишком изношена.", 3000, true);
		}else{
			return notyAPI.error("У Вас должна быть удочка.", 3000, true);
		}
		
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) return notyAPI.error("У Вас есть активная сделка, рыбалка недоступна.", 3000, true);
		}
		
		localPlayer.clearTasksImmediately();
		
		let breadCount = 0, insectsCount = 0, wormsCount = 0, bloodwormCount = 0, minfishCount = 0;
		for (let i = 1; i <= 30; i++) {
			if(typeof(myInv[i.toString()]) !== "undefined") {
				if(myInv[i.toString()].hash == "bread") breadCount = breadCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "insects") insectsCount = insectsCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "worms") wormsCount = wormsCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "bloodworm") bloodwormCount = bloodwormCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "minifish") minfishCount = minfishCount + parseInt(myInv[i.toString()].amount);
			}
		}
		
		if(breadCount == 0 && insectsCount == 0 && wormsCount == 0 && bloodwormCount == 0 && minfishCount == 0) return notyAPI.error("У Вас нет наживок, купите их в магазине 24/7.", 3000, true);
		
		allowBinds = [];
		hud_browser.execute('toggleFishBait(\''+JSON.stringify(myInv)+'\');');
		mp.gui.cursor.visible = true;
	}
}

function fishingStop(isDeath) {
    if(fishingMode) {
		if(typeof(fishingMode.rod) !== "undefined") mp.events.callRemote('stopFishingRod', fishingMode.rod);
		if(poklevkaTimer) clearInterval(poklevkaTimer);
		if(typeof(fishingMode.popl) !== "undefined") {
			if(fishingMode.popl) {
				if(mp.vehicles.exists(fishingMode.popl)) {
					fishingMode.popl.destroy();
				}
			}
		}
		if(typeof(isDeath) === "undefined") localPlayer.clearTasksImmediately();
		localPlayer.freezePosition(false);
		restoreBinds();
		fishingStartProcess = false;
		fishingMode = {"rod":fishingMode.rod};
	}
}

function closeFishingBait() {
	if(hud_browser) {
		hud_browser.execute("toggleFishBait();");
		mp.gui.cursor.visible = false;
		restoreBinds();
	}
}
mp.events.add("closeFishingBait", closeFishingBait);

var fishingStartProcess = false;
function baitFishSelected(baitData) {
	if(hud_browser && baitData) {
		baitData = JSON.parse(baitData);
		hud_browser.execute("toggleFishBait();");
		mp.gui.cursor.visible = false;
		
		if(typeof(localPlayer.getVariable("player.inv")) === "undefined") {
			restoreBinds();
			return notyAPI.error("Инвентарь не инициализирован, рыбалка недоступна.", 3000, true);
		}
		
		if(typeof(localPlayer.getVariable("active.deal")) !== "undefined") {
			if(localPlayer.getVariable("active.deal")) {
				restoreBinds();
				return notyAPI.error("У Вас есть активная сделка, рыбалка недоступна.", 3000, true);
			}
		}
		
		let myInv = localPlayer.getVariable("player.inv");
		
		if(typeof(myInv["instrument"]) !== "undefined") {
			if(parseInt(myInv["instrument"].health) <= 0) return notyAPI.error("Рыболовная снасть слишком изношена.", 3000, true);
		}else{
			return notyAPI.error("У Вас должна быть удочка.", 3000, true);
		}
		
		let breadCount = 0, insectsCount = 0, wormsCount = 0, bloodwormCount = 0, minfishCount = 0;
		for (let i = 1; i <= 30; i++) {
			if(typeof(myInv[i.toString()]) !== "undefined") {
				if(myInv[i.toString()].hash == "bread") breadCount = breadCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "insects") insectsCount = insectsCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "worms") wormsCount = wormsCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "bloodworm") bloodwormCount = bloodwormCount + parseInt(myInv[i.toString()].amount);
				else if(myInv[i.toString()].hash == "minifish") minfishCount = minfishCount + parseInt(myInv[i.toString()].amount);
			}
		}
		
		if(baitData.bait == "bread" && breadCount < 1) {
			restoreBinds();
			return notyAPI.error("У Вас нет хлебного мякиша, выберите другую наживку.", 3000, true);
		}else if(baitData.bait == "insects" && insectsCount < 1) {
			restoreBinds();
			return notyAPI.error("У Вас нет личинок насекомых, выберите другую наживку.", 3000, true);
		}else if(baitData.bait == "worms" && wormsCount < 1) {
			restoreBinds();
			return notyAPI.error("У Вас нет дождевых червей, выберите другую наживку.", 3000, true);
		}else if(baitData.bait == "bloodworm" && bloodwormCount < 1) {
			restoreBinds();
			return notyAPI.error("У Вас нет личинок мотыля, выберите другую наживку.", 3000, true);
		}else if(baitData.bait == "minifish" && minfishCount < 1) {
			restoreBinds();
			return notyAPI.error("У Вас нет мальков, выберите другую наживку.", 3000, true);
		}
		
		if(dealerPanel) return notyAPI.error("У Вас есть активная сделка с барыгой.", 3000, true);
		
		fishingStartProcess = true;
		restoreBinds();
		
		let theRod = "rod";
		if(typeof(fishingMode.rod) !== "undefined") theRod = fishingMode.rod;
		mp.events.callRemote('startFishing', baitData.bait, baitData.force, theRod);
	}
}
mp.events.add("baitFishSelected", baitFishSelected);

mp.game.streaming.requestAnimDict("amb@world_human_stand_fishing@idle_a");
function fishingStartResult(selectedBait, selectedForce) {
	if(hud_browser && selectedBait && selectedForce) {
		selectedForce = parseInt(selectedForce);
		selectedForce = selectedForce/2;
		
		if(selectedForce < 5) selectedForce = 5;
		else if(selectedForce > 100) selectedForce = 50;
		
		if(typeof(fishingMode.rod) !== "undefined") {
			if(fishingMode.rod == "badrod") selectedForce = selectedForce / 3;
			else if(fishingMode.rod == "rod") selectedForce = selectedForce / 1.5;
			//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * fishingMode.rod: "+fishingMode.rod+"</span>");
		}
		
		if(selectedForce < 5) selectedForce = 5;
		else if(selectedForce > 100) selectedForce = 50;
		
		//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * selectedForce: "+selectedForce+"</span>");
		
		localPlayer.freezePosition(true);
		localPlayer.taskPlayAnim("amb@world_human_stand_fishing@idle_a", "idle_c", 8.0, 1.0, -1, 1, 1.0, false, false, false);
		allowBinds = [0x45, 0x54];
		
		let myPos = localPlayer.position;
		let myRot = localPlayer.getHeading();
		
		myPos.x = myPos.x + Math.sin(Math.radians(-myRot))*selectedForce;
		myPos.y = myPos.y + Math.cos(Math.radians(-myRot))*selectedForce;
		myPos.z = mp.game.gameplay.getGroundZFor3dCoord(myPos.x, myPos.y, myPos.z, parseFloat(0), false)+1;
		
		let objectPlaceChecker = mp.objects.new(mp.game.joaat("apa_mp_h_acc_candles_01"), myPos,
		{
			rotation: 0,
			alpha: 0,
			dimension: 0
		});
		
		// waterchecker
		let pedWaterChecker = mp.peds.new(
			mp.game.joaat('a_c_fish'), 
			myPos,
			270.0,
			localPlayer.dimension
		);
		setTimeout(function() { pedWaterChecker.freezePosition(false); }, 500);
		
		if(hud_browser) hud_browser.execute('playSound("fishStart", "0.15");');
		
		setTimeout(function() {
			if(mp.peds.exists(pedWaterChecker) && mp.objects.exists(objectPlaceChecker)) {
				localPlayer.taskPlayAnim("amb@world_human_stand_fishing@idle_a", "idle_a", 8.0, 1.0, -1, 1, 1.0, false, false, false);
				
				let inWater = pedWaterChecker.isInWater();
				let isDead = pedWaterChecker.isDead();
				//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * isInWater: "+inWater.toString()+"</span>");
				//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * isDead: "+isDead.toString()+"</span>");
				let fishPos = JSON.parse(JSON.stringify(pedWaterChecker.position));
				let zWater = mp.game1.water.getWaterHeight(fishPos.x, fishPos.y, fishPos.z, 0);
				pedWaterChecker.destroy();
				
				let fishDepth = roundNumber(mp.game.gameplay.getDistanceBetweenCoords(fishPos.x, fishPos.y, fishPos.z, fishPos.x, fishPos.y, zWater, true), 1);
				
				//if(fishDepth > 54 && fishDepth < 55.3) fishDepth = 3.5;
				//else if(fishDepth > 100) fishDepth = false;
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 198.8398, -934.9554, 32.1712, 140)) fishDepth = 1.0; // ЛС, Новогодняя ёлка
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 1081.7274, -644.2034, 54.4545, 100)) fishDepth = 2.5; // Озеро ЛС, Зеркальный парк, миррор плейс.
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 1218.9407, -89.261, 58.9954, 180)) fishDepth = 1.45; // Сеть речушек ЛС, Бульвар миррор-парк.
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -1166.9042, 35.2409, 51.5676, 200)) fishDepth = 1.75; // Три озера ЛС, Дорсет драйв.
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -1544.209, 1458.4209, 116.2313, 350)) fishDepth = 2.45; // Долина Тонгва, Тонгва драйв. 1
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -1421.0978, 2013.1532, 58.8455, 350)) fishDepth = 3.25; // Долина Тонгва, Тонгва драйв. 2
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 3097.5725, 6022.7881, 121.6004, 30)) fishDepth = 1.65; // Гора Гордо, Озеро 1
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 2559.1509, 6153.6787, 161.1644, 30)) fishDepth = 3.15; // Гора Гордо, Озеро 2
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 1261.8419, -1051.9392, 38.6356, 100)) fishDepth = 1.35; // Высоты Муриетты, говнотечка.
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 1069.0568, 16.7011, 79.2786, 30)) fishDepth = 1.65; // Иподром возле Казино, Озеро 1
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), 1203.3315, 209.7524, 78.8071, 50)) fishDepth = 1.35; // Иподром возле Казино, Озеро 2
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -1319.1462, -430.8666, 34.7838, 30)) fishDepth = 1.35; // Фикс бассейна, Дель-Перро
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -1708.988, -188.32, 56.3206, 100)) fishDepth = 1.55; // Фикс искусственного озера на кладбище ЛС
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -2008.8386, -286.2224, 31.219, 80)) fishDepth = 1.35; // Фикс бассейна, Пасифик Блаффс.
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -2954.6509, 698.0601, 27.754, 100)) fishDepth = 1.55; // Фикс бассейнов в Каньоне Бэнхэм
				
				if(mp.game.object.isObjectNearPoint(mp.game.joaat("apa_mp_h_acc_candles_01"), -1849.9648, 283.6768, 87.1439, 30)) fishDepth = 1.55; // Фикс бассейна в особняке на VW
				
				
				if(imInZZ) fishDepth = 1.0; // Если возможна рыбалка в ЗЗ, то 1 м.
				
				objectPlaceChecker.destroy();
				
				if(fishDepth > 100) fishDepth = false;
				
				if(fishDepth && inWater == 1 && isDead == 0 && zWater > -1) {
					// poplavok
					
					let poplVeh = mp.vehicles.new(mp.game.joaat("popl"), new mp.Vector3(fishPos.x, fishPos.y, zWater), {
						alpha: 255,
						color: [[255, 255, 255],[255, 255, 255]],
						locked: true,
						engine: true,
						dimension: localPlayer.dimension
					});
					
					poplVeh.setLights(3);
					poplVeh.setLightMultiplier(0.5);
					poplVeh.setFullbeam(false);
					poplVeh.setMaxSpeed(0);
					poplVeh.setEngineHealth(660);
					poplVeh.setProofs(true, true, true, true, true, false, false, true);
					
					fishingMode["popl"] = poplVeh;
					
					fishingMode["pos"] = fishPos;
					fishingMode["bait"] = selectedBait;
					fishingMode["depth"] = fishDepth;
					fishingMode["poklevka"] = false;
					fishingMode["putting"] = false;
					fishingMode["time"] = 0;
					
					fishingMode["tip"] = "всё в порядке";
					
					if(!oldFishingPos) {
						oldFishingPos = localPlayer.position;
						posFishingWarns = 0;
					}else{
						let oldAndNew = mp.game.system.vdist(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, oldFishingPos.x, oldFishingPos.y, oldFishingPos.z);
						if(oldAndNew < getRandomInt(5,15)) {
							posFishingWarns++;
						}else{
							oldFishingPos = false;
							posFishingWarns = 0;
						}
					}
					
					if(posFishingWarns >= 4) {
						fishingMode["tip"] = "говорят, надо сместиться в другое место";
					}else{
						if(fishDepth > 0 && fishDepth <= 5) {
							if(selectedBait == "bread") fishingMode["tip"] = "всё нормально";
							else if(selectedBait == "insects") fishingMode["tip"] = "в целом, всё нормально";
							else if(selectedBait == "worms") fishingMode["tip"] = "в целом, так себе";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "малая глубина для мотыля";
							else if(selectedBait == "minifish") fishingMode["tip"] = "малая глубина для малька";
						}else if(fishDepth > 5 && fishDepth <= 15) {
							if(selectedBait == "bread") fishingMode["tip"] = "всё хорошо";
							else if(selectedBait == "insects") fishingMode["tip"] = "всё нормально";
							else if(selectedBait == "worms") fishingMode["tip"] = "всё хорошо";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "ну, так себе";
							else if(selectedBait == "minifish") fishingMode["tip"] = "малая глубина для малька";
						}else if(fishDepth > 15 && fishDepth <= 25) {
							if(selectedBait == "bread") fishingMode["tip"] = "всё отлично";
							else if(selectedBait == "insects") fishingMode["tip"] = "всё хорошо";
							else if(selectedBait == "worms") fishingMode["tip"] = "всё нормально";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "ну, так себе";
							else if(selectedBait == "minifish") fishingMode["tip"] = "тут вроде что-то есть";
						}else if(fishDepth > 25 && fishDepth <= 45) {
							if(selectedBait == "bread") fishingMode["tip"] = "слишком глубоко для мякиша";
							else if(selectedBait == "insects") fishingMode["tip"] = "всё отлично";
							else if(selectedBait == "worms") fishingMode["tip"] = "всё хорошо";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "всё нормально";
							else if(selectedBait == "minifish") fishingMode["tip"] = "ну, пойдёт";
						}else if(fishDepth > 45 && fishDepth <= 65) {
							if(selectedBait == "bread") fishingMode["tip"] = "слишком глубоко для мякиша";
							else if(selectedBait == "insects") fishingMode["tip"] = "слишком глубоко для насекомых";
							else if(selectedBait == "worms") fishingMode["tip"] = "всё супер";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "всё отлично";
							else if(selectedBait == "minifish") fishingMode["tip"] = "всё нормально";
						}else if(fishDepth > 65 && fishDepth <= 85) {
							if(selectedBait == "bread") fishingMode["tip"] = "слишком глубоко для мякиша";
							else if(selectedBait == "insects") fishingMode["tip"] = "слишком глубоко для насекомых";
							else if(selectedBait == "worms") fishingMode["tip"] = "слишком глубоко для червей";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "всё отлично";
							else if(selectedBait == "minifish") fishingMode["tip"] = "всё хорошо";
						}else if(fishDepth > 85) {
							if(selectedBait == "bread") fishingMode["tip"] = "слишком глубоко для мякиша";
							else if(selectedBait == "insects") fishingMode["tip"] = "слишком глубоко для насекомых";
							else if(selectedBait == "worms") fishingMode["tip"] = "слишком глубоко для червей";
							else if(selectedBait == "bloodworm") fishingMode["tip"] = "слишком глубоко для мотыля";
							else if(selectedBait == "minifish") fishingMode["tip"] = "всё отлично";
						}
					}
					
					if(hud_browser) hud_browser.execute('playSound("splash", "0.1");');
					//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * fishing: "+JSON.stringify(fishingMode)+"</span>");
				}else{
					if(!fishDepth) {
						fishingStartProcess = false;
						fishingStop();
						mp.game.ui.messages.showMidsizedShard("~w~Не хватило ~r~лески~w~ или ~r~мёртвый ~w~водоём!", "~s~Глубоко или мёртвый водоём, попробуйте в другом месте..", 5, false, true, 6500);
					}else{
						fishingStartProcess = false;
						fishingStop();
						mp.game.ui.messages.showMidsizedShard("~w~Вся приманка ~r~рассыпалась~w~!", "~s~Попробуйте ещё раз..", 5, false, true, 6500);
					}
				}
				
				fishingStartProcess = false;
			}
		}, 2500);
	}
}
mp.events.add("fishingStartResult", fishingStartResult);

var poklevkaTimer = false;
function fishingProcessor() {
	if(typeof(fishingMode.time) !== "undefined") {
		fishingMode.time = parseInt(fishingMode.time) + 1;
		//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * fishing: "+JSON.stringify(fishingMode)+"</span>");
		
		let isPoklevka = 0;
		if(typeof(fishingMode.depth) !== "undefined") {
			if(fishingMode.depth > 0 && fishingMode.depth <= 5) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,3);
				else if(fishingMode.time >= 2) isPoklevka = 1;
			}else if(fishingMode.depth > 5 && fishingMode.depth <= 15) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,4);
				else if(fishingMode.time == 2) isPoklevka = getRandomInt(0,3);
				else if(fishingMode.time >= 3) isPoklevka = 1;
			}else if(fishingMode.depth > 15 && fishingMode.depth <= 25) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,5);
				else if(fishingMode.time == 2) isPoklevka = getRandomInt(0,4);
				else if(fishingMode.time == 3) isPoklevka = getRandomInt(0,3);
				else if(fishingMode.time >= 4) isPoklevka = 1;
			}else if(fishingMode.depth > 25 && fishingMode.depth <= 45) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,6);
				else if(fishingMode.time == 2) isPoklevka = getRandomInt(0,5);
				else if(fishingMode.time == 3) isPoklevka = getRandomInt(0,4);
				else if(fishingMode.time == 4) isPoklevka = getRandomInt(0,3);
				else if(fishingMode.time >= 5) isPoklevka = 1;
			}else if(fishingMode.depth > 45 && fishingMode.depth <= 65) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,7);
				else if(fishingMode.time == 2) isPoklevka = getRandomInt(0,6);
				else if(fishingMode.time == 3) isPoklevka = getRandomInt(0,5);
				else if(fishingMode.time == 4) isPoklevka = getRandomInt(0,3);
				else if(fishingMode.time >= 5) isPoklevka = 1;
			}else if(fishingMode.depth > 65 && fishingMode.depth <= 85) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,8);
				else if(fishingMode.time == 2) isPoklevka = getRandomInt(0,7);
				else if(fishingMode.time == 3) isPoklevka = getRandomInt(0,5);
				else if(fishingMode.time == 4) isPoklevka = getRandomInt(0,3);
				else if(fishingMode.time >= 5) isPoklevka = 1;
			}else if(fishingMode.depth > 85) {
				if(fishingMode.time == 1) isPoklevka = getRandomInt(0,10);
				else if(fishingMode.time == 2) isPoklevka = getRandomInt(0,8);
				else if(fishingMode.time == 3) isPoklevka = getRandomInt(0,6);
				else if(fishingMode.time == 4) isPoklevka = getRandomInt(0,4);
				else if(fishingMode.time >= 5) isPoklevka = 1;
			}
		}
		
		if(isPoklevka == 1) {
			localPlayer.taskPlayAnim("amb@world_human_stand_fishing@idle_a", "idle_c", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			fishingMode.poklevka = true;
			mp.game.ui.messages.showMidsized("~w~Ого, у Вас ~g~клюёт", "~w~Подсекайте рыбу, срочно нажмите ~g~E ~w~!");
			if(hud_browser) hud_browser.execute('playSound("poklevka", "0.15");');
			
			let poklevkaTimes = 0;
			poklevkaTimer = setInterval(function() {
				poklevkaTimes++;
				if(poklevkaTimes >= 5) {
					clearInterval(poklevkaTimer);
					fishingStop();
					mp.game.ui.messages.showMidsizedShard("~w~Рыба ~r~сорвалась~w~!", "~s~Вы не смогли поймать рыбу~n~Очень жаль, в следующий раз получится!", 5, false, true, 6500);
				}
			}, 1000);
		}else{
			if(hud_browser && getRandomInt(0,2) == 1) {
				hud_browser.execute('playSound("fakePoklevka", "0.15");');
				localPlayer.taskPlayAnim("amb@world_human_stand_fishing@idle_a", "idle_b", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			}else{
				localPlayer.taskPlayAnim("amb@world_human_stand_fishing@idle_a", "idle_a", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			}
		}
	}
}

function poklevkaOk() {
	if(poklevkaTimer) clearInterval(poklevkaTimer);
	if(hud_browser) {
		fishingMode.putting = true;
		hud_browser.execute("toggleFishPutting(true);");
		mp.gui.cursor.visible = true;
		allowBinds = [];
	}
}

function fishPutting(putResult) {
	if(hud_browser && typeof(putResult) !== "undefined") {
		hud_browser.execute("toggleFishPutting();");
		if(putResult) {
			if(typeof(fishingMode.depth) !== "undefined" && typeof(fishingMode.bait) !== "undefined") {
				let fishHash = fishGenerator(fishingMode.depth, fishingMode.bait);
				if(typeof(allStuff["fish"][fishHash]) !== "undefined") {
					let fishName = allStuff["fish"][fishHash].name;
					mp.game.ui.messages.showMidsizedShard("~w~Рыба ~g~поймана~w~!", "~w~Вы поймали ~g~"+fishName+"~n~~w~Проверьте Ваш инвентарь!", 5, false, true, 6500);
					mp.events.callRemote('invPutFish', fishHash);
				}else{
					mp.game.ui.messages.showMidsizedShard("~w~Приманка ~r~оторвалась~w~!", "~s~Вы не смогли поймать рыбу~n~Очень жаль, в следующий раз получится!", 5, false, true, 6500);
				}
			}else{
				mp.game.ui.messages.showMidsizedShard("~w~Приманка ~r~оторвалась~w~!", "~s~Вы не смогли поймать рыбу~n~Очень жаль, в следующий раз получится!", 5, false, true, 6500);
			}
		}else{
			mp.game.ui.messages.showMidsizedShard("~w~Рыба ~r~сорвалась~w~!", "~s~Вы не смогли поймать рыбу~n~Очень жаль, в следующий раз получится!", 5, false, true, 6500);
		}
		mp.gui.cursor.visible = false;
	}
	fishingStop();
}
mp.events.add("fishPutting", fishPutting);

function fishGenerator(theDepth, theBait) {
	if(typeof(theDepth) !== "undefined" && typeof(theBait) !== "undefined") {
		if(theDepth && theBait) {
			let theFishResult = false;
			
			let theRod = "badrod";
			
			if(typeof(fishingMode.rod) !== "undefined") theRod = fishingMode.rod;
			
			if(posFishingWarns >= 4) {
				theFishResult = "deadfish";
			}else{
				if(theDepth > 0 && theDepth <= 5) {
					if(theBait == "bread") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "ukleyka";
						else if(getRand == 1) theFishResult = "peskar";
						else if(getRand == 2) theFishResult = "ukleyka";
						else if(getRand == 3) theFishResult = "peskar";
					}else if(theBait == "insects") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "krasnoperka";
						else if(getRand == 1) theFishResult = "ukleyka";
						else if(getRand == 2) theFishResult = "plotva";
						else if(getRand == 3) theFishResult = "zherekh";
					}else if(theBait == "worms") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "lesh";
						else if(getRand == 1) theFishResult = "lesh";
						else if(getRand == 2) theFishResult = "karas";
						else if(getRand == 3) theFishResult = "karas";
					}else if(theBait == "bloodworm") {
						theFishResult = false;
					}else if(theBait == "minifish") {
						theFishResult = false;
					}
				}else if(theDepth > 5 && theDepth <= 15) {
					if(theBait == "bread") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "peskar";
						else if(getRand == 1) theFishResult = "peskar";
						else if(getRand == 2) theFishResult = "ukleyka";
						else if(getRand == 3) theFishResult = "gustera";
					}else if(theBait == "insects") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "krasnoperka";
						else if(getRand == 1) theFishResult = "ukleyka";
						else if(getRand == 2) theFishResult = "zherekh";
						else if(getRand == 3) theFishResult = "plotva";
					}else if(theBait == "worms") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "lesh";
						else if(getRand == 1) theFishResult = "karas";
						else if(getRand == 2) theFishResult = "karas";
						else if(getRand == 3) theFishResult = "golavl";
					}else if(theBait == "bloodworm") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "lesh";
							else if(getRand == 1) theFishResult = "karas";
							else if(getRand == 2) theFishResult = "karas";
							else if(getRand == 3) theFishResult = "golavl";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "forel";
							else if(getRand == 1) theFishResult = "forel";
							else if(getRand == 2) theFishResult = "losos";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}else if(theBait == "minifish") {
						theFishResult = false;
					}
				}else if(theDepth > 15 && theDepth <= 25) {
					if(theBait == "bread") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "krasnoperka";
						else if(getRand == 1) theFishResult = "ukleyka";
						else if(getRand == 2) theFishResult = "peskar";
						else if(getRand == 3) theFishResult = "zherekh";
					}else if(theBait == "insects") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "krasnoperka";
						else if(getRand == 1) theFishResult = "plotva";
						else if(getRand == 2) theFishResult = "peskar";
						else if(getRand == 3) theFishResult = "gustera";
					}else if(theBait == "worms") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "sazan";
						else if(getRand == 1) theFishResult = "golavl";
						else if(getRand == 2) theFishResult = "lesh";
						else if(getRand == 3) theFishResult = "karas";
					}else if(theBait == "bloodworm") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "losos";
							else if(getRand == 1) theFishResult = "forel";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}else if(theBait == "minifish") {
						let getRand = getRandomInt(0,2);
						if(getRand == 0) theFishResult = "scat";
						else if(getRand == 1) theFishResult = "tunec";
					}
				}else if(theDepth > 25 && theDepth <= 45) {
					if(theBait == "bread") {
						theFishResult = false;
					}else if(theBait == "insects") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "krasnoperka";
						else if(getRand == 1) theFishResult = "plotva";
						else if(getRand == 2) theFishResult = "zherekh";
						else if(getRand == 3) theFishResult = "gustera";
					}else if(theBait == "worms") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "sazan";
						else if(getRand == 1) theFishResult = "golavl";
						else if(getRand == 2) theFishResult = "lesh";
						else if(getRand == 3) theFishResult = "karas";
					}else if(theBait == "bloodworm") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "losos";
							else if(getRand == 1) theFishResult = "forel";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}else if(theBait == "minifish") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "littleshark";
							else if(getRand == 1) theFishResult = "beluga";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}
				}else if(theDepth > 45 && theDepth <= 65) {
					if(theBait == "bread") {
						theFishResult = false;
					}else if(theBait == "insects") {
						theFishResult = false;
					}else if(theBait == "worms") {
						let getRand = getRandomInt(0,4);
						if(getRand == 0) theFishResult = "sazan";
						else if(getRand == 1) theFishResult = "golavl";
						else if(getRand == 2) theFishResult = "lesh";
						else if(getRand == 3) theFishResult = "karas";
					}else if(theBait == "bloodworm") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "losos";
							else if(getRand == 1) theFishResult = "forel";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}else if(theBait == "minifish") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "littleshark";
							else if(getRand == 1) theFishResult = "beluga";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}
				}else if(theDepth > 65 && theDepth <= 85) {
					if(theBait == "bread") {
						theFishResult = false;
					}else if(theBait == "insects") {
						theFishResult = false;
					}else if(theBait == "worms") {
						theFishResult = false;
					}else if(theBait == "bloodworm") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "losos";
							else if(getRand == 1) theFishResult = "forel";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}else if(theBait == "minifish") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "littleshark";
							else if(getRand == 1) theFishResult = "beluga";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}
				}else if(theDepth > 85) {
					if(theBait == "bread") {
						theFishResult = false;
					}else if(theBait == "insects") {
						theFishResult = false;
					}else if(theBait == "worms") {
						theFishResult = false;
					}else if(theBait == "bloodworm") {
						theFishResult = false;
					}else if(theBait == "minifish") {
						if(theRod == "badrod") {
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "sazan";
							else if(getRand == 1) theFishResult = "golavl";
							else if(getRand == 2) theFishResult = "lesh";
							else if(getRand == 3) theFishResult = "karas";
						}else{
							let getRand = getRandomInt(0,4);
							if(getRand == 0) theFishResult = "littleshark";
							else if(getRand == 1) theFishResult = "beluga";
							else if(getRand == 2) theFishResult = "scat";
							else if(getRand == 3) theFishResult = "tunec";
						}
					}
				}
			}
			return theFishResult;
		}
	}
}
}댧œ