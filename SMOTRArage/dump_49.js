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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			if(args[1]) {
				if(args[1] == "1") {
					vehAdmRemover = true;
					notyAPI.success("Функция ремувера авто активирована, используй Colt.", 3000, true);
				}else{
					notyAPI.error("Функция ремувера авто деактивирована.", 3000, true);
					vehAdmRemover = false;
				}
			}
			break;
		/*case 'xdon':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "admin") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
			chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Раздаём новогодний донат</span>");
			mp.events.callRemote('giveXDonate');
			break;*/
		case 'allprem':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			notyAPI.info("Вы выдали всем игрокам 1 день бесплатного премиум-доступа.", 3000, true);
			mp.events.callRemote('giveAllPremium');
			break;
		case 'trail':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			if(args[1] && args[2] && args[3]) {
				mp.game.invoke("0xF401B182DBA8AF53", localPlayer.handle, true);
				mp.game.invoke("0x8217FD371A4625CF", localPlayer.handle, parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
			}
			break;
		case 'blackout':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			if(args[1]) {
				let blackOut = false;
				if(args[1] == "1") blackOut = true;
				mp.events.callRemote('blackOut', blackOut);
			}
			break;
		case 'optitest':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

				if(args[1] && args[2]) {
					let streamType = args[1].toString();
					let streamAmount = parseInt(args[2]);
					mp.events.callRemote('setMaxStreamed', streamType, streamAmount);
				}
			break;
		/*case 'restart':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "genadm")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('restart');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Ok, restarted.</span>");
			break;*/
		case 'eblanio':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "genadm")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");
				mp.events.callRemote('initTraffic');
			break;
		/*case 'logging':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "genadm")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

				mp.events.callRemote('enableLogging');
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Активируем / Деактивируем логирование.</span>");
			break;*/
		case 'xmas':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

				mp.events.callRemote('xmasStart');
				notyAPI.success("ВЫ ЗАПУСТИЛИ НОВОГОДНИЕ ПОДАРКИ!", 3000, true);
			break;
		case 'dragy':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			/*if(localPlayer.getVariable("player.status") != "genadm")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");*/
				
				if(!localPlayer.vehicle) return notyAPI.error("Вы должны быть в транспорте.", 3000, true);
				if(typeof(dragy.veh) === "undefined") {
					dragy["veh"] = theVeh;
					dragy["frames"] = 0;
					dragy["ready"] = false;
					dragy["started"] = false;
					dragy["60kmh"] = 0;
					dragy["100kmh"] = 0;
					dragy["200kmh"] = 0;
					notyAPI.success("<b>DRAGY Активирован</b>, пожалуйста остановите транспорт полностью", 3000, true);
				}else{
					dragy = {};
					notyAPI.success("Замер окончен, что бы начать новый - введите <b>/dragy</b>.", 3000, true);
				}
			break;
		case 'boom':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(typeof(args[1]) !== "undefined" && typeof(args[2]) !== "undefined" && typeof(args[3]) !== "undefined") {
				let explosionType = args[1].toString();
				let damageScale = args[2].toString();
				let cameraShake = args[3].toString();
				mp.events.callRemote('createBoom', explosionType, damageScale, cameraShake);
			}
			break;
		case 'tatto':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(typeof(args[1]) !== "undefined" && typeof(args[2]) !== "undefined") {
				let tattoDir = args[1].toString();
				let tattoTex = args[2].toString();
				localPlayer.setDecoration(mp.game.joaat(tattoDir), mp.game.joaat(tattoTex));
				notyAPI.success("Коллекция: <b>"+tattoDir+"</b> | Татуха: <b>"+tattoTex+"</b>", 3000, true);
			}else{
				localPlayer.clearDecorations();
			}
			break;
		case 'coords':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "moder") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(typeof(args[1]) !== "undefined" && typeof(args[2]) !== "undefined" && typeof(args[3]) !== "undefined") {
				let xCoord = parseFloat(args[1]);
				let yCoord = parseFloat(args[2]);
				let zCoord = parseFloat(args[3]);
				
				mp.events.call("sleepAntiCheat");
				localPlayer.position = new mp.Vector3(xCoord, yCoord, zCoord);
			}
			break;
		/*case 'testvote':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(args[1]) {
				let isEnable = args[1].toString();
				mp.events.callRemote('electionTest', isEnable);
			}
			break;
		case 'gravity':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция недоступна для Вас.</span>");
			if(localPlayer.getVariable("player.status") != "genadm")
				return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Эта функция доступна только администраторам.</span>");

			if(args[1]) {
				let gravityLVL = parseInt(args[1]);
				mp.game.gameplay.setGravityLevel(gravityLVL);
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Гравитация: "+gravityLVL+"</span>");
			}
			break;*/
		case 'containers':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(args[1]) {
				let isEnable = args[1].toString();
				mp.events.callRemote('containersToggle', isEnable);
			}
			break;
		case 'walk':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(args[1]) {
				let styleName = args[1].toString();
				
				mp.game.streaming.requestClipSet(styleName);
				localPlayer.setMovementClipset(styleName, 0.25);
				
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * handle: "+args[1]+".</span>");
			}
			break;
		case 'handling':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(args[1] && typeof(args[2]) !== "undefined" && localPlayer.vehicle) {
				localPlayer.vehicle.setHandling(args[1].toString(), args[2].toString(), true);
				chatAPI.sysPush("<span style=\"color:#FF6146;\"> * "+args[1].toString()+": "+args[2].toString()+".</span>");
			}
			break;
		case 'otkat':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			if(args[1]) {
				let fracID = args[1].toString();
				
				if(typeof(mp.world.data.fractions) === "undefined") return notyAPI.error("Откат сейчас недоступен", 3000, true);
				
				let fractions = mp.world.data.fractions;
				if(parseInt(fracID) < 1 || parseInt(fracID) > fractions.length-1) return notyAPI.error("Синтаксис: <b>/otkat</b> [1-"+(fractions.length-1)+"]", 3000, true);
				if(!fracID) return notyAPI.error("Синтаксис: <b>/otkat</b> [1-"+(fractions.length-1)+"]", 3000, true);
				
				if(typeof(fractions[fracID]) !== "undefined") {
					if(!imInZone) return notyAPI.error("Вы не на территории", 3000, true);
					
					if(typeof(mp.world.data.zones) === "undefined") return notyAPI.error("Откат сейчас недоступен (зоны не инициализированы)", 3000, true);
					if(typeof(mp.world.data.zones[imInZone]) !== "undefined") {
						let tempZone = mp.world.data.zones[imInZone];
						if(tempZone.own.id != fracID) mp.events.callRemote('otkatZone', fracID, imInZone);
						else return notyAPI.error("Эта территория уже пренадлежит этой организации", 3000, true);
					}else{
						return notyAPI.error("Откат сейчас недоступен (зона не инициализирована)", 3000, true);
					}
				}else{
					return notyAPI.error("Такой организации нет", 3000, true);
				}
			}
			break;
		case 'fish':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
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
		case 'exdrop':
			// /drop ammo amLL false 200 100
			if(args[1] && args[2] && args[3] && args[4] && args[5]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
				if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
				
				let dropType = args[1].toString();
				let dropHash = args[2].toString();
				let dropSex = args[3].toString();
				let dropAmount = parseInt(args[4]);
				let dropHealth = parseInt(args[5]);
				
				let resDropData = {"type":dropType,"hash":dropHash,"amount":dropAmount,"health":dropHealth};
				if(dropSex == "male" || dropSex == "female") resDropData = {"type":dropType,"hash":dropHash,"sex":dropSex,"amount":dropAmount,"health":dropHealth};
				
				notyAPI.success("Дроп "+dropType+" | "+dropHash+" | "+dropSex+" | "+dropAmount+" | "+dropHealth+" успешно создан!", 3000, true);
				mp.events.callRemote('invDrop', false, JSON.stringify(resDropData), false);
			}
			break;
		case 'jobrank':
			if(args[1]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
				if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
				
				let newRank = args[1].toString();
				if(parseInt(newRank) > 0 && parseInt(newRank) <= 10) {
					notyAPI.success("Ваш новый ранг: "+newRank+".", 3000, true);
					mp.events.callRemote('jobAdmSetRank', newRank);
				}else{
					return notyAPI.error("Некорректный ранг, синтаксис <b>/jobrank</b> [1-10]", 3000, true);
				}
			}
			break;
		case 'dirt':
			if(args[1]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
				if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
	
				let dirtLevel = parseFloat(args[1]);
				if(theVeh) theVeh.setDirtLevel(dirtLevel);
			}
			break;
		case 'house':
			if(args[1]) {
				if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
				if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
	
				mp.events.call("sleepAntiCheat");
				let houseID = args[1].toString();
				if(houseID) mp.events.callRemote('goToHouse', houseID);
			}
			break;
		case 'go':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);

			if(typeof(taxiFinishPos) !== "undefined") {
				if(typeof(taxiFinishPos.x) != "undefined" && typeof(taxiFinishPos.y) != "undefined" && typeof(taxiFinishPos.z) != "undefined") {
					mp.events.call("sleepAntiCheat");
					return mp.events.callRemote('goToWaypoint', taxiFinishPos.x, taxiFinishPos.y, taxiFinishPos.z);
				}else{
					return chatAPI.sysPush("<span style=\"color:#FF6146;\"> * WayPoint не установлен.</span>");
				}
			}
			break;
		case 'fx':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let pPos = localPlayer.position;
			
			let heading = localPlayer.getHeading();
			if(localPlayer.vehicle) localPlayer.vehicle.getHeading();
			
			pPos.x = roundNumber(pPos.x, 4);
			pPos.y = roundNumber(pPos.y, 4);
			pPos.z = roundNumber(pPos.z, 4);
			
			chatAPI.sysPush("<span style=\"color:#FFFFFF;\">{\"x\":"+pPos.x+",\"y\":"+pPos.y+",\"z\":"+pPos.z+",\"heading\":"+heading+"}</span>");
			mp.events.callRemote('savePos', JSON.stringify(pPos), heading.toString());
			
			break;
		case 'ca':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
	
			let theVehName = args[1].toString();
			if(theVehName) mp.events.callRemote('spawnVeh', theVehName);
			break;
		case 'co':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
	
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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			mp.events.callRemote('kickAll');
			break;
		case 'tuning':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let theTuning = args[1];
			let tuningValue = args[2];
			
			if(theTuning && tuningValue) mp.events.callRemote('vehTuning', theVeh, theTuning, tuningValue);
			notyAPI.success("Tuning "+theTuning+" | Value: "+tuningValue, 3000, true);
			break;
		case 'tuninfo':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
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
		case 'livery':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			if(theVeh) {
				let theLivery = parseInt(args[1]);
				//theVeh.setMod(48, theLivery);
				theVeh.setLivery(theLivery+1);
				theVeh.setMod(48, theLivery);
				notyAPI.success("Винил установлен: "+theLivery, 3000, true);
				//theVeh.setLivery(theLivery);
			}
			break;
		case 'ch':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			homeCreate();
			break;
		case 'cb':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			businessCreate();
			break;
		case 'int':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let num = parseInt(args[1]);
			if(num < 0 || num > ints.length-1) return notyAPI.error("Синтаксис: <b>/int</b> [0-"+(ints.length-1)+"]", 3000, true);
			let interior = ints[num];
			if(!interior) return notyAPI.error("Синтаксис: <b>/int</b> [0-"+(ints.length-1)+"]", 3000, true);
			
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
		case 'cloth':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			mp.events.callRemote('delAdminVehs');
			break;
		case 'num':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let theNum = args[1].toString();
			theVeh.setNumberPlateText(theNum);
			break;
		case 'extra':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let theExtra = parseInt(args[1]);
			let turnExtra = parseInt(args[2]);
			
			theVeh.setExtra(theExtra, turnExtra);
			notyAPI.success("EXTRA "+theExtra+" | АКТИВАЦИЯ: "+theVeh.isExtraTurnedOn(theExtra).toString(), 3000, true);
			
			break;
		case 'tint':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let tint = args[1];
			if(tint) mp.events.callRemote('vehTint', theVeh, tint);
			break;
		case 'prmoney':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
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
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let theAnimDir = args[1].toString();
			let theAnim = args[2].toString();
			mp.game.streaming.requestAnimDict(theAnimDir);
			setTimeout(function() {
				localPlayer.taskPlayAnim(theAnimDir, theAnim, 8.0, 1.0, -1, 1, 1.0, false, false, false);
			}, 500);
			break;
		case 'skinos':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let theSkin = args[1].toString();
			if(theSkin) {
				notyAPI.success("Выбран временный скин: "+theSkin, 3000, true);
				mp.events.callRemote('setPedSkin', theSkin);
			}
			break;
		case 'max':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			if(theVeh) {
				let maxSpeed = parseInt(args[1]);
				theVeh.setMaxSpeed(maxSpeed*0.277);
				return notyAPI.error("Временная максималка: "+maxSpeed+" км/ч.", 3000, true);
			}
			break;
		case 'vehclass':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			if(theVeh) chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Veh Class: "+theVeh.getClass()+"</span>");
			break;
		case 'weather':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let weath1 = args[1].toString();
			let weath2 = args[2].toString();
			let trans = parseFloat(args[3]);
			if(weath1 && weath2 && trans) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * WEATHER | "+weath1+" | 2: "+weath2+" | Trans: "+trans+"</span>");
				mp.game.gameplay.setWeatherTypeTransition(mp.game.gameplay.getHashKey(weath1), mp.game.gameplay.getHashKey(weath2), trans);
			}
			break;
		case 'attach':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let objAt = args[1].toString();
			let bodyPart = parseInt(args[2]);
			if(objAt && bodyPart) {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * ATTACH | "+objAt+" | bodyPart: "+bodyPart+"</span>");
				attacher(objAt, bodyPart);
			}
			break;
		case 'waves':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let wavesHeight = parseFloat(args[1]);
			if(typeof(wavesHeight) !== "undefined") {
				chatAPI.sysPush("<span style=\"color:#FFFFFF;\"> * Wawes height setted to: "+wavesHeight+"</span>");
				mp.game.water.setWavesIntensity(wavesHeight);
			}
			break;
		case 'flysky':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			notyAPI.success("Вы активировали возможность летать, используйте [ <b>F6</b> ]!", 3000, true);
			flyAdmin = true;
			break;
		case 'fsay':
			if(typeof(localPlayer.getVariable("player.status")) == "undefined") return notyAPI.error("Эта функция недоступна для Вас.", 3000, true);
			if(localPlayer.getVariable("player.status") != "genadm" && localPlayer.getVariable("player.status") != "admin" && localPlayer.getVariable("player.status") != "moder" && localPlayer.getVariable("player.status") != "helper") return notyAPI.warning("Эта функция доступна только администраторам.", 3000, true);
			
			let fromFSayID = args[1].toString();
			delete args[0];
			//args = args.filter(function (el) { return el != null; });
			let fromFSayText = [...args];
			notyAPI.error("Text: "+fromFSayText, 3000, true);
			
			let fromFSayPlayer = false;
			
			mp.players.forEach(
				(player, id) => {
					if(typeof(player.getVariable("player.id")) !== "undefined" && typeof(player.getVariable("player.nick")) !== "undefined") {
						let tempPlID = player.getVariable("player.id").toString();
						if(tempPlID == fromFSayID) fromFSayPlayer = player;
					}
				}
			);
			
			if(fromFSayPlayer) {
				if(fromFSayText) mp.events.callRemote("checkChatMessage", fromFSayPlayer, "forall", fromFSayText);
			}else{
				notyAPI.error("Игрок с таким ID не найден.", 3000, true);
			}
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