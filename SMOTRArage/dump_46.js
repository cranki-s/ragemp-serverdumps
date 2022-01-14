{
/*var zoneRotation = 0;
var zoneRadius = 60;*/

var vehAdmRemover = false;

var g_bIslandLoaded = false;
var dragy = {};
function playerCommand(command) {
	const args = command.split(/[ ]+/);
	const commandName = args[0];
	
	let theVeh = localPlayer.vehicle;
	
	switch(commandName) {
		/*case 'islandooo':
			g_bIslandLoaded = !g_bIslandLoaded;
			
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Island: loading.</span>");
			
			localPlayer.position = new mp.Vector3(4840.571, -5174.425, 2.0);
			
			mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", g_bIslandLoaded);
			mp.game.invoke("0x5E1460624D194A38", g_bIslandLoaded); // for island map in pause menu and minimap
			
			break;
		case 'zonedata':
			if(args[1] && args[2]) {
				let zRotation = parseFloat(args[1]);
				let zRadius = parseFloat(args[2]);
				zoneRotation = zRotation;
				zoneRadius = zRadius;
				
				if(blipToMe.doesExist()) blipToMe.destroy();
				blipToMe = mp.blips.new(9, new mp.Vector3(0, 0, 0),
				{
					scale: 1,
					color: 1,
					alpha: 175,
					shortRange: true,
					rotation: zoneRotation,
					dimension: 0,
					radius: zoneRadius
				});
				
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * ZDATA | ROT: "+zRotation+" | RAD: "+zoneRadius+".</span>");
			}
			break;*/
			
		case 'vehremover':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			if(args[1]) {
				if(args[1] == "1") {
					vehAdmRemover = true;
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Функция ремувера авто активирована, используй Colt.</span>");
				}else{
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Функция ремувера авто деактивирована.</span>");
					vehAdmRemover = false;
				}
			}
			break;
		case 'xdon':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Раздаём новогодний донат</span>");
			mp.events.callRemote('giveXDonate');
			break;
		case 'blackout':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			if(args[1]) {
				let blackOut = false;
				if(args[1] == "1") blackOut = true;
				mp.events.callRemote('blackOut', blackOut);
			}
			break;
		case 'drft':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				if(!localPlayer.vehicle) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Вы не в машине.</span>");
				localPlayer.vehicle.setHandling("strModelFlags", 440000);
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * ДРФТ МД</span>");
			break;
		case 'optitest':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Максимальный стрим: </span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.players.maxStreamed: "+mp.players.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.peds.maxStreamed: "+mp.peds.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.vehicles.maxStreamed: "+mp.vehicles.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.colshapes.maxStreamed: "+mp.colshapes.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.objects.maxStreamed: "+mp.objects.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.markers.maxStreamed: "+mp.markers.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.labels.maxStreamed: "+mp.labels.maxStreamed+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * mp.checkpoints.maxStreamed: "+mp.checkpoints.maxStreamed+"</span>");
				
				var countersss = 0;
				var imInterval = setInterval(function() {
					countersss++;
					localPlayer.setComponentVariation(3, countersss, 0, 0); // Торс
					localPlayer.setComponentVariation(8, countersss, 0, 0); // Акваланг
					localPlayer.setComponentVariation(11, countersss, 0, 0); // Верх
					localPlayer.setComponentVariation(4, countersss, 0, 0); // Штаны
					if(countersss >= 250) clearInterval(imInterval);
				}, 100);
			break;
		case 'maxstream':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				if(args[1] && args[2]) {
					let streamType = args[1].toString();
					let streamAmount = parseInt(args[2]);
					mp.events.callRemote('setMaxStreamed', streamType, streamAmount);
				}
			break;
		case 'restart':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('restart');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Ok, restarted.</span>");
			break;
		case 'sort':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('sortTest');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Sended command</span>");
			break;
		case 'capters':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('actualCapters');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Sended command</span>");
			break;
		case 'parachute':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('giveMeParachute');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Ok.</span>");
			break;
		case 'eblanio':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('initTraffic');
			break;
		case 'logging':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				mp.events.callRemote('enableLogging');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Активируем / Деактивируем логирование.</span>");
			break;
		case 'enterveh':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				//mp.events.callRemote('segTest');
				mp.events.callRemote('segTest2');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * TEST.</span>");
			break;
		case 'occupants':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				mp.events.callRemote('getVehOccups');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Чекай серверную консоль</span>");
			break;
		case 'xmas':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				mp.events.callRemote('xmasStart');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * ВЫ ЗАПУСТИЛИ НОВОГОДНИЕ ПОДАРКИ!</span>");
			break;
		case 'freevehs':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Проверь серверную консоль.</span>");
				mp.events.callRemote('freeVehsLog');
			break;
		case 'dragy':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			/*if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");*/
				
				if(!theVeh) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Вы должны быть в транспорте.</span>");
				if(typeof(dragy.veh) === "undefined") {
					dragy["veh"] = theVeh;
					dragy["frames"] = 0;
					dragy["ready"] = false;
					dragy["started"] = false;
					dragy["60kmh"] = 0;
					dragy["100kmh"] = 0;
					dragy["200kmh"] = 0;
					chatAPI.sysPush("<span style=\"color:#FFF;\"> * <span style=\"color:#2EB224;\"><b>DRAGY Активирован</b></span>, пожалуйста остановите транспорт полностью.</span>");
				}else{
					dragy = {};
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Замер окончен, что бы начать новый - введите /dragy.</span>");
				}
			break;
		case 'boom':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(typeof(args[1]) !== "undefined" && typeof(args[2]) !== "undefined" && typeof(args[3]) !== "undefined") {
				let explosionType = args[1].toString();
				let damageScale = args[2].toString();
				let cameraShake = args[3].toString();
				mp.events.callRemote('createBoom', explosionType, damageScale, cameraShake);
			}
			break;
		case 'testvote':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(args[1]) {
				let isEnable = args[1].toString();
				mp.events.callRemote('electionTest', isEnable);
			}
			break;
		/*case 'gravity':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(args[1]) {
				let gravityLVL = parseInt(args[1]);
				mp.game.gameplay.setGravityLevel(gravityLVL);
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Гравитация: "+gravityLVL+"</span>");
			}
			break;*/
		case 'containers':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(args[1]) {
				let isEnable = args[1].toString();
				mp.events.callRemote('containersToggle', isEnable);
			}
			break;
		case 'walk':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(args[1]) {
				let styleName = args[1].toString();
				
				mp.game.streaming.requestClipSet(styleName);
				localPlayer.setMovementClipset(styleName, 0.25);
				
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * handle: "+args[1]+".</span>");
			}
			break;
		case 'stresstest':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(args[1]) {
				let stresses = args[1].toString();
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * НАГРУЗКА.</span>");
				mp.events.callRemote('stressTest', stresses);
			}
			break;
		case 'taxiclients':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Проверь серверную консоль.</span>");
				mp.events.callRemote('taxiClientsLog');
			break;
		case 'reises':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Проверь серверную консоль.</span>");
				mp.events.callRemote('reisesTrucksLog');
			break;
		case 'otkat':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(args[1]) {
				let fracID = args[1].toString();
				
				if(typeof(mp.world.data.fractions) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Откат сейчас недоступен</span>");
				
				let fractions = mp.world.data.fractions;
				if(parseInt(fracID) < 1 || parseInt(fracID) > fractions.length-1) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Синтаксис: /otkat [1-"+(fractions.length-1)+"]</span>");
				if(!fracID) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Синтаксис: /otkat [1-"+(fractions.length-1)+"]</span>");
				
				if(typeof(fractions[fracID]) !== "undefined") {
					if(!imInZone) return hud_browser.execute('fractionPanelsError(\'#fracCapt\', \'Вы не на территории\');');
					
					if(typeof(mp.world.data.zones) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Откат сейчас недоступен (зоны не инициализированы)</span>");
					if(typeof(mp.world.data.zones[imInZone]) !== "undefined") {
						let tempZone = mp.world.data.zones[imInZone];
						if(tempZone.own.id != fracID) mp.events.callRemote('otkatZone', fracID, imInZone);
						else return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта территория уже пренадлежит этой организации</span>");
					}else{
						return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Откат сейчас недоступен (зона не инициализирована)</span>");
					}
				}else{
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Такой организации нет</span>");
				}
			}
			break;
		case 'fish':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let myPos = localPlayer.position;
			let myRot = localPlayer.getHeading();
			
			myPos.x = myPos.x + Math.sin(Math.radians(-myRot))*8;
			myPos.y = myPos.y + Math.cos(Math.radians(-myRot))*8;
			myPos.z = mp.game.gameplay.getGroundZFor3dCoord(myPos.x, myPos.y, myPos.z, parseFloat(0), false)+1;
			
			// waterchecker
			let pedWaterChecker = mp.peds.new(
				mp.game.joaat('a_c_fish'), 
				myPos,
				270.0,
				localPlayer.dimension
			);
			setTimeout(function() {
				pedWaterChecker.freezePosition(false);
			}, 500);
			
			if(hud_browser) hud_browser.execute('playSound("fishStart", "0.15");');
			
			setTimeout(function() {
				if(mp.peds.exists(pedWaterChecker)) {
					let inWater = pedWaterChecker.isInWater();
					let isDead = pedWaterChecker.isDead();
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * isInWater: "+inWater.toString()+"</span>");
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * isDead: "+isDead.toString()+"</span>");
					let fishPos = pedWaterChecker.position;
					let zWater = mp.game.water.getWaterHeight(fishPos.x, fishPos.y, fishPos.z, 0);
					pedWaterChecker.destroy();
					
					let fishDepth = roundNumber(mp.game.gameplay.getDistanceBetweenCoords(fishPos.x, fishPos.y, fishPos.z, fishPos.x, fishPos.y, zWater, true), 1);
					
					if(inWater == 1 && isDead == 0 && zWater > -1) {
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
						
						let fishingData = {"pos":fishPos,"depth":fishDepth};
						chatAPI.sysPush("<span style=\"color:#FF6146;\"> * fishingData: "+JSON.stringify(fishingData)+"</span>");
					}
				}
			}, 2500);
			
			//pedWaterChecker.destroy();

			localPlayer.freezePosition(true);
			mp.game.streaming.requestAnimDict("amb@world_human_stand_fishing@base");
			localPlayer.taskPlayAnim("amb@world_human_stand_fishing@base", "base", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			
			// anim@mp_player_intcelebrationmale@find_the_fish find_the_fish_facial - поймал рыбу!
			break;
		case 'myammo':
			if(typeof(localPlayer.ammoInUse) !== "undefined") chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Your ammo: "+localPlayer.ammoInUse+".</span>");
			else chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Fuck you.</span>");
			break;
		case 'looters':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Loot up!</span>");
			mp.events.callRemote('lootSpawner');
			break;
		case 'bizevents':
			if(typeof(localPlayer.getVariable("player.businesses")) !== "undefined") {
				let myBusinesses = localPlayer.getVariable("player.businesses");
				for (var k in myBusinesses.businesses) {
					let businessData = myBusinesses.businesses[k];
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * COUNT EVENTS: "+Object.keys(businessData.events).length+".</span>");
					if(businessData.events != "" || JSON.stringify(businessData.events) != "[]") {
						mp.game.ui.notifications.showWithPicture("Управляющий", "Разберитесь с делами", "Внимание, коммерция ID "+businessData.id+" имеет невыполненные задачи.", "CHAR_CHENG", 1, false, 1, 2);
					}
				}
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * BIZES: "+JSON.stringify(myBusinesses)+".</span>");
			}
			break;
		case 'donate':
			mp.game.ui.notifications.showWithPicture("Твой бро", "Подписывайся", "~w~ВКонтакте: ~o~vk.com/smotrarage~n~~w~Сайт: ~o~smotrarage.ru", "CHAR_JIMMY", 1, false, 1, 2);
			mp.game.ui.notifications.showWithPicture("Твой бро", "Ты знал о Discord?", "~w~Наш Discord: ~o~discord.gg/smotra", "CHAR_JIMMY", 1, false, 1, 2);
			mp.game.ui.notifications.showWithPicture("Твой бро", "Официальный донат", "~w~Донат: ~o~smotrarage.ru/donate", "CHAR_JIMMY", 1, false, 1, 2);
			break;
		case 'overrides':
			mp.game.vehicle.addModelOverride("7e38", "oracle2");
			mp.game.vehicle.addModelOverride("2101", "oracle2");
			mp.game.vehicle.addModelOverride("2103", "oracle2");
			mp.game.vehicle.addModelOverride("2105", "oracle2");
			mp.game.vehicle.addModelOverride("2108", "oracle2");
			mp.game.vehicle.addModelOverride("a45", "oracle2");
			mp.game.vehicle.addModelOverride("bnt2018", "oracle2");
			mp.game.vehicle.addModelOverride("c63", "oracle2");
			mp.game.vehicle.addModelOverride("camry55", "oracle2");
			mp.game.vehicle.addModelOverride("casino", "oracle2");
			mp.game.vehicle.addModelOverride("chiron", "oracle2");
			mp.game.vehicle.addModelOverride("chr20", "oracle2");
			mp.game.vehicle.addModelOverride("crown210", "oracle2");
			mp.game.vehicle.addModelOverride("e34", "oracle2");
			mp.game.vehicle.addModelOverride("e63amg", "oracle2");
			mp.game.vehicle.addModelOverride("e63w213", "oracle2");
			mp.game.vehicle.addModelOverride("evo10", "oracle2");
			mp.game.vehicle.addModelOverride("fd", "oracle2");
			mp.game.vehicle.addModelOverride("fk8", "oracle2");
			mp.game.vehicle.addModelOverride("g63", "oracle2");
			mp.game.vehicle.addModelOverride("gts", "oracle2");
			mp.game.vehicle.addModelOverride("jzx90", "oracle2");
			mp.game.vehicle.addModelOverride("lancerevo", "oracle2");
			mp.game.vehicle.addModelOverride("lx2018", "oracle2");
			mp.game.vehicle.addModelOverride("m2", "oracle2");
			mp.game.vehicle.addModelOverride("m3e30", "oracle2");
			mp.game.vehicle.addModelOverride("m3e46", "oracle2");
			mp.game.vehicle.addModelOverride("m5e60", "oracle2");
			mp.game.vehicle.addModelOverride("m5f90", "oracle2");
			mp.game.vehicle.addModelOverride("m8", "oracle2");
			mp.game.vehicle.addModelOverride("m340", "oracle2");
			mp.game.vehicle.addModelOverride("mb_g63", "oracle2");
			mp.game.vehicle.addModelOverride("mb_ml63", "oracle2");
			mp.game.vehicle.addModelOverride("mb_w140", "oracle2");
			mp.game.vehicle.addModelOverride("mb_w210", "oracle2");
			mp.game.vehicle.addModelOverride("nisgtr", "oracle2");
			mp.game.vehicle.addModelOverride("octavia", "oracle2");
			mp.game.vehicle.addModelOverride("p1", "oracle2");
			mp.game.vehicle.addModelOverride("perfomante", "oracle2");
			mp.game.vehicle.addModelOverride("priora", "oracle2");
			mp.game.vehicle.addModelOverride("r8", "oracle2");
			mp.game.vehicle.addModelOverride("r34", "oracle2");
			mp.game.vehicle.addModelOverride("ramlh20", "oracle2");
			mp.game.vehicle.addModelOverride("rculi", "oracle2");
			mp.game.vehicle.addModelOverride("rrsport", "oracle2");
			mp.game.vehicle.addModelOverride("rs6avant", "oracle2");
			mp.game.vehicle.addModelOverride("RS62", "oracle2");
			mp.game.vehicle.addModelOverride("s2000", "oracle2");
			mp.game.vehicle.addModelOverride("silvias15", "oracle2");
			mp.game.vehicle.addModelOverride("supra", "oracle2");
			mp.game.vehicle.addModelOverride("svj", "oracle2");
			mp.game.vehicle.addModelOverride("trhawk", "oracle2");
			mp.game.vehicle.addModelOverride("x5", "oracle2");
			mp.game.vehicle.addModelOverride("x5e53", "oracle2");
			mp.game.vehicle.addModelOverride("x5me70", "oracle2");
			mp.game.vehicle.addModelOverride("zr1", "oracle2");
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Overrides setted to oracle2.</span>");
			break;
		case 'exdrop':
			// /drop ammo amLL false 200 100
			if(args[1] && args[2] && args[3] && args[4] && args[5]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
				if(localPlayer.getVariable("player.status") != "admin")
					return false;
				
				let dropType = args[1].toString();
				let dropHash = args[2].toString();
				let dropSex = args[3].toString();
				let dropAmount = parseInt(args[4]);
				let dropHealth = parseInt(args[5]);
				
				let resDropData = {"type":dropType,"hash":dropHash,"amount":dropAmount,"health":dropHealth};
				if(dropSex == "male" || dropSex == "female") resDropData = {"type":dropType,"hash":dropHash,"sex":dropSex,"amount":dropAmount,"health":dropHealth};
				
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Дроп "+dropType+" | "+dropHash+" | "+dropSex+" | "+dropAmount+" | "+dropHealth+" успешно создан!</span>");
				mp.events.callRemote('invDrop', false, JSON.stringify(resDropData), false);
			}
			break;
		case 'jobrank':
			if(args[1]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
				if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				
				let newRank = args[1].toString();
				if(parseInt(newRank) > 0 && parseInt(newRank) <= 12) {
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Ваш новый ранг: "+newRank+".</span>");
					mp.events.callRemote('jobAdmSetRank', newRank);
				}else{
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Некорректный ранг, синтаксис /jobrank [<b>1-12</b>] (без скобок)</span>");
				}
			}
			break;
		case 'dirt':
			if(args[1]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
				if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
	
				let dirtLevel = parseFloat(args[1]);
				if(theVeh) theVeh.setDirtLevel(dirtLevel);
			}
			break;
		case 'house':
			if(args[1]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
				if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
	
				mp.events.call("sleepAntiCheat");
				let houseID = args[1].toString();
				if(houseID) mp.events.callRemote('goToHouse', houseID);
			}
			break;
		case 'coords':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(args[1] && args[2] && args[3]) {
				mp.events.call("sleepAntiCheat");
				let coX = parseFloat(args[1]);
				let coY = parseFloat(args[2]);
				let coZ = parseFloat(args[3]);
				localPlayer.position = new mp.Vector3(coX,coY,coZ);
			}
			break;
		case 'go':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(typeof(taxiFinishPos) !== "undefined") {
				if(taxiFinishPos.x != 0 && taxiFinishPos.y != 0 && taxiFinishPos.z != 0) {
					mp.events.call("sleepAntiCheat");
					return mp.events.callRemote('goToWaypoint', taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z);
				}else{
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * WayPoint не установлен.</span>");
				}
			}
			break;
		case 'paleto':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			//mp.events.call("sleepAntiCheat");
			mp.events.callRemote('goToPaleto');
			break;
		case 'fx':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(args[1] && args[2]) {
				let fxDir = args[1].toString();
				let fxName = args[2].toString();
				let myFxPos = localPlayer.position;
				
				if(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxDir)) {
					mp.game.streaming.requestNamedPtfxAsset(fxDir);
					while(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxDir)) mp.game.wait(0);
				}
				mp.game.graphics.setPtfxAssetNextCall(fxDir);
				mp.game.graphics.startParticleFxLoopedAtCoord(fxName, myFxPos.x, myFxPos.y, myFxPos.z, 0, 0, 0, 1, true, true, true, false);
			}
			break;
		case 'models':
			let DLCModels = parseInt(mp.game.invoke("0xA7A866D21CD2329B"));
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Models: "+DLCModels+"</span>");
			
			for(let i = 370; i < 378; i++) {
				let DLCModel = mp.game.invoke("0xECC01B7C5763333C", i).toString();
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Model: "+DLCModel+"</span>");
				let DLCData = mp.game.invoke("0x5549EE11FA22FCF2", i).toString();
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Data: "+DLCData+"</span>");
				/*let ppPos = localPlayer.position;
				mp.vehicles.new(mp.joaat(DLCModel), new mp.Vector3(ppPos.x, ppPos.y, ppPos.z),
				{
					heading: 0,
					dimension: 0
				});*/
			}
			break;
		case 'memory':
			if(housesInStream != null || typeof(housesInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total houses in memory: "+Object.keys(housesInStream).length+"</span>");
			if(businessesInStream != null || typeof(businessesInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total businesses in memory: "+Object.keys(businessesInStream).length+"</span>");
			if(schoolsInStream != null || typeof(schoolsInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total schools in memory: "+Object.keys(schoolsInStream).length+"</span>");
			if(autosalonsInStream != null || typeof(autosalonsInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total autosalons in memory: "+Object.keys(autosalonsInStream).length+"</span>");
			if(tuningsInStream != null || typeof(atmInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total atms in memory: "+Object.keys(atmInStream).length+"</span>");
			if(tuningsInStream != null || typeof(tuningsInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total tunings in memory: "+Object.keys(tuningsInStream).length+"</span>");
			if(garTuningsInStream != null || typeof(garTuningsInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total garTunings in memory: "+Object.keys(garTuningsInStream).length+"</span>");
			if(fVehInStream != null || typeof(fVehInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total freeVehs in memory: "+Object.keys(fVehInStream).length+"</span>");
			if(gasInStream != null || typeof(gasInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total gases in memory: "+Object.keys(gasInStream).length+"</span>");
			if(pedsInStream != null || typeof(pedsInStream) !== "undefined") chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total peds in memory: "+Object.keys(pedsInStream).length+"</span>");
			
			break;
		case 'houses':
			for(var k in housesInStream) {
				let houseData = housesInStream[k];
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Marker: "+typeof(houseData["marker"])+" | Blip: "+typeof(houseData["blip"])+"</span>");
			}
			
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Total houses in memory: "+Object.keys(housesInStream).length+"</span>");
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\">Houses: "+JSON.stringify(housesInStream)+"</span>");
			
			break;
		case 'pos':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let pPos = localPlayer.position;
			
			let heading = localPlayer.getHeading();
			if(localPlayer.vehicle) localPlayer.vehicle.getHeading();
			
			pPos.x = roundNumber(pPos.x, 4);
			pPos.y = roundNumber(pPos.y, 4);
			pPos.z = roundNumber(pPos.z, 4);
			
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\">{\"x\":"+pPos.x+",\"y\":"+pPos.y+",\"z\":"+pPos.z+",\"heading\":"+heading+"}</span>");
			//mp.events.callRemote('savePos', JSON.stringify(pPos), heading.toString());
			
			break;
		case 'ca':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
	
			let theVehName = args[1].toString();
			if(theVehName) mp.events.callRemote('spawnVeh', theVehName);
			break;
		case 'co':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
	
			let theObjName = args[1].toString();
			if(theObjName) {
				mp.objects.new(mp.game.joaat(theObjName), localPlayer.position,
				{
					rotation: new mp.Vector3(0,0,0),
					alpha: 255,
					dimension: localPlayer.dimension
				});
			}
			break;
		case 'kickall':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			mp.events.callRemote('kickAll');
			break;
		case 'tuning':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theTuning = args[1];
			let tuningValue = args[2];
			
			if(theTuning && tuningValue) mp.events.callRemote('vehTuning', theVeh, theTuning, tuningValue);
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Tuning "+theTuning+" | Value: "+tuningValue+"</span>");
			break;
		case 'tuninfo':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(theVeh) {
				let spoilers = 0, fbumps = 0, bbumps = 0, skirts = 0, hoods = 0, fenders = 0, roofs = 0;
				spoilers = theVeh.getNumMods(0); // Spoilers
				fbumps = theVeh.getNumMods(1); // Front bumps
				bbumps = theVeh.getNumMods(2); // Back bumps
				skirts = theVeh.getNumMods(3); // Side Skirts
				hoods = theVeh.getNumMods(7); // Hoods
				fenders = theVeh.getNumMods(8); // Fenders
				roofs = theVeh.getNumMods(10); // Roofs
				if(spoilers > 0 || fbumps > 0 || bbumps > 0 || skirts > 0 || hoods > 0 || fenders > 0 || roofs > 0) chatAPI.sysPush("<span style=\"color:#FF6146;\"> * тюнинг: присутствует</span>");
				else chatAPI.sysPush("<span style=\"color:#FF6146;\"> * тюнинг: отсутствует</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * spoilers: "+spoilers+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * fbumps: "+fbumps+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * bbumps: "+bbumps+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * skirts: "+skirts+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * hoods: "+hoods+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * fenders: "+fenders+"</span>");
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * roofs: "+roofs+"</span>");
			}
			break;
		case 'neon':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(theVeh) {
				theVeh.setNeonLightsColour(255, 0, 0);
				theVeh.setNeonLightEnabled(0, true);
				theVeh.setNeonLightEnabled(1, true);
				theVeh.setNeonLightEnabled(2, true);
				theVeh.setNeonLightEnabled(3, true);
			}
			break;
		case 'livery':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(theVeh) {
				let theLivery = parseInt(args[1]);
				//theVeh.setMod(48, theLivery);
				theVeh.setLivery(theLivery+1);
				theVeh.setMod(48, theLivery);
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Винил: "+theLivery+".</span>");
				//theVeh.setLivery(theLivery);
			}
			break;
		case 'ch':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			homeCreate();
			break;
		case 'cb':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			businessCreate();
			break;
		case 'int':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let num = parseInt(args[1]);
			if(num < 0 || num > ints.length-1) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Синтаксис: /int [0-"+(ints.length-1)+"]</span>");
			let interior = ints[num];
			if(!interior) return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Синтаксис: /int [0-"+(ints.length-1)+"]</span>");
			
			mp.events.call("sleepAntiCheat");
			
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * "+interior.name+" ["+num+"]</span>");
			interior.x = parseInt(interior.x);
			interior.y = parseInt(interior.y);
			interior.z = parseInt(interior.z);
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * X: "+interior.x+" Y: "+interior.y+" Z: "+interior.z+"</span>");
			localPlayer.position = new mp.Vector3(interior.x, interior.y, interior.z);
			if(typeof(interior.ipl) !== "undefined") {
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * IPL: "+interior.ipl+"</span>");
				if(!mp.game.streaming.isIplActive(interior.ipl)) {
					mp.game.streaming.requestIpl(interior.ipl);
					chatAPI.sysPush("<span style=\"color:#FF6146;\"> * IPL Loaded..</span>");
				}
			}
			break;
		/*case 'as':
			//mp.game.streaming.requestIpl("apa_v_mp_h_04_a");
			localPlayer.position = new mp.Vector3(916.5676, -3242.8772, -97.3186);
			break;*/
		case 'cloth':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let componentId = parseInt(args[1]);
			let drawableId = parseInt(args[2]);
			let textureId = parseInt(args[3]);
			
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Шмотка напялена "+componentId+" | "+drawableId+" | "+textureId+" :)</span>"); 
			
			localPlayer.setComponentVariation(componentId, drawableId, textureId, 0);
			
			//localPlayer.setComponentVariation(3, 1, 0, 0); // Торс
			//localPlayer.setComponentVariation(11, 184, 1, 0); // Верх
			//localPlayer.setComponentVariation(4, 79, 1, 0); // Низ
			//localPlayer.setComponentVariation(6, 31, 1, 0); // Обувь
			
			break;
		case 'prop':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let propId = parseInt(args[1]);
			let drawId = parseInt(args[2]);
			let texId = parseInt(args[3]);
			
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Проп напялен "+propId+" | "+drawId+" | "+texId+" :)</span>"); 
			
			localPlayer.setPropIndex(propId, drawId, texId, true);
			
			//localPlayer.setComponentVariation(3, 1, 0, 0); // Торс
			//localPlayer.setComponentVariation(11, 184, 1, 0); // Верх
			//localPlayer.setComponentVariation(4, 79, 1, 0); // Низ
			//localPlayer.setComponentVariation(6, 31, 1, 0); // Обувь
			
			break;
		case 'delca':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			mp.events.callRemote('delAdminVehs');
			break;
		case 'num':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theNum = args[1].toString();
			theVeh.setNumberPlateText(theNum);
			break;
		case 'extra':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theExtra = parseInt(args[1]);
			let turnExtra = parseInt(args[2]);
			
			theVeh.setExtra(theExtra, turnExtra);
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * EXTRA "+theExtra+" | TURNED: "+theVeh.isExtraTurnedOn(theExtra).toString()+"</span>");
			
			break;
		/*case 'cruise':
			let vehSpeed = args[1].toString();
			if(theVeh && vehSpeed) localPlayer.setDriveTaskCruiseSpeed(parseFloat(vehSpeed));
			break;*/
		/*case 'color1':
			let R1 = args[1];
			let G1 = args[2];
			let B1 = args[3];
			
			mp.events.callRemote('vehColor1', theVeh, R1, G1, B1);
			break;
		case 'color2':
			let R2 = args[1];
			let G2 = args[2];
			let B2 = args[3];
			
			if(R2 && G2 && B2) mp.events.callRemote('vehColor2', theVeh, R2, G2, B2);
			break;
		case 'colortyre':
			let RTyre = args[1];
			let GTyre = args[2];
			let BTyre = args[3];
			
			if(RTyre && GTyre && BTyre) mp.events.callRemote('vehColorTyre', theVeh, RTyre, GTyre, BTyre);
			break;
		case 'mcolor':
			let theMaterialColor = args[1];
			
			if(theMaterialColor) mp.events.callRemote('vehMatColor', theVeh, theMaterialColor);
			break;
		case 'colorwh':
			let theWheelsColor = args[1];
			
			if(theWheelsColor) mp.events.callRemote('vehWheelsColor', theVeh, theWheelsColor);
			break;
		case 'colorpearl':
			let thePearlColor = args[1];
			
			if(thePearlColor) mp.events.callRemote('vehPearlColor', theVeh, thePearlColor);
			break;
		case 'salon':
			localPlayer.position = new mp.Vector3(1485.19000000, 3643.60300000, -74.03876000);
			break;
		case 'obj':
			let obj = args[1].toString();
			mp.objects.new(mp.game.joaat(obj), localPlayer.position,
			{
				rotation: {"x":0,"y":0,"z":0},
				dimension: 0
			});
			break;
		case 'speedwalk':
			let speedWalk = parseFloat(args[1]);
			mp.game.player.setRunSprintMultiplierFor(speedWalk);
			break;*/
		case 'tint':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let tint = args[1];
			if(tint) mp.events.callRemote('vehTint', theVeh, tint);
			break;
		case 'prmoney':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theMoneyValue = parseInt(args[1]);
			if(typeof(theMoneyValue) !== "undefined" && theMoneyValue > 0) mp.events.callRemote('givePlayerMoney', theMoneyValue);
			break;
		case 'cam':
			let type = parseInt(args[1]);
			/*if(type) {
				if(type == 1) {
					if(vehCam) {
						vehCam.setActive(false);
						vehCam.detach();
						vehCam.destroy();
						vehCam = null;
					}
					mp.game.cam.renderScriptCams(false, false, 0, false, false);
					
				}
				if(type == 2) {
					if(hud_browser) hud_browser.execute("toggleTuningMenu(true);");
				}
			}*/
			break;
		case 'anim':
			if(typeof(localPlayer.getVariable("player.status")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theAnimDir = args[1].toString();
			let theAnim = args[2].toString();
			mp.game.streaming.requestAnimDict(theAnimDir);
			setTimeout(function() {
				localPlayer.taskPlayAnim(theAnimDir, theAnim, 8.0, 1.0, -1, 1, 1.0, false, false, false);
			}, 500);
			break;
		case 'handling':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theType = args[1].toString();
			let theValue = parseFloat(args[2]);
			if(theVeh) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Handling | "+theType+": "+theValue+"</span>");
				theVeh.setHandling(theType, theValue);
			}
			break;
		case 'gethandling':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				
			if(theVeh) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * getHandling | "+theVeh.getHandling("fDriveBiasFront")+"</span>");
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * getDefaultHandling | "+theVeh.getDefaultHandling("fDriveBiasFront")+"</span>");
			}
			break;
		case 'skinos':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let theSkin = args[1].toString();
			if(theSkin) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * New Skin | "+theSkin+"</span>");
				mp.events.callRemote('setPedSkin', theSkin);
			}
			break;
		/*case 'whwidth':
			let whwidth = parseFloat(args[1]);
			if(theVeh) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * WidthWheels | "+whwidth+" | Handle: "+theVeh.handle+"</span>");
				mp.game.invoke("0x211AB1DD8D0F363A", theVeh.handle, "trackwidth_f", 1.45);
			}*/
		case 'max':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(theVeh) {
				let maxSpeed = parseInt(args[1]);
				theVeh.setMaxSpeed(maxSpeed*0.277);
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Max Speed: "+maxSpeed+"</span>");
			}
			break;
		case 'vehclass':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			if(theVeh) chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Veh Class: "+theVeh.getClass()+"</span>");
			break;
		case 'weather':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			let weath1 = args[1].toString();
			let weath2 = args[2].toString();
			let trans = parseFloat(args[3]);
			if(weath1 && weath2 && trans) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * WEATHER | "+weath1+" | 2: "+weath2+" | Trans: "+trans+"</span>");
				mp.game.gameplay.setWeatherTypeTransition(mp.game.gameplay.getHashKey(weath1), mp.game.gameplay.getHashKey(weath2), trans);
			}
			break;
		case 'flysky':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			
			mp.game.ui.messages.showMidsizedShard("~y~SMOTRA~w~rage ~b~режим полёта", "~s~Режим полёта активирован, нажми F6", 5, false, true, 5000);
			flyAdmin = true;
			break;
	}
}
mp.events.add("playerCommand", playerCommand);

function giveXDonate() {
	mp.game.ui.messages.showMidsizedShard("~y~Вы получили ~w~100 ~y~донат едениц", "~s~С новым 2022 годом!~n~~s~Урааа! Урааа! Урааа!", 5, false, true, 8000);
}
mp.events.add("giveXDonate", giveXDonate);

function blackOut(blackOut) {
	if(typeof(blackOut) !== "undefined") {
		for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, blackOut); mp.game.graphics.setBlackout(blackOut);
	}
}
mp.events.add("blackOut", blackOut);
}