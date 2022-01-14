{
var masksAdd = 8; // 5

var maleHeadAdd = 11; // 3
var maleGlassesAdd = 6; // 0
var maleShoesAdd = 4; // 4
var malePantsAdd = 11; // 5
var maleTorsAdd = 31; // 20

var femaleHeadAdd = 0;
var femaleGlassesAdd = 0;
var femaleShoesAdd = 0;
var femalePantsAdd = 0;
var femaleTorsAdd = 0;

/*
mp.events.addDataHandler('player.passive', function (entity, value, oldValue) {
	if(entity && entity.type == 'player' && entity.handle != 0) {
		if(value) {
			//entity.setAlpha(200);
			entity.setNoCollision(localPlayer.handle, false);
			localPlayer.setNoCollision(entity.handle, false);
			mp.players.forEachInStreamRange(
				(player, id) => {
					entity.setNoCollision(player.handle, false);
					player.setNoCollision(entity.handle, false);
				}
			);
		}else{
			//entity.resetAlpha();
			entity.setNoCollision(localPlayer.handle, true);
			localPlayer.setNoCollision(entity.handle, true);
			mp.players.forEachInStreamRange(
				(player, id) => {
					entity.setNoCollision(player.handle, true);
					player.setNoCollision(entity.handle, true);
				}
			);
		}
	}
});
*/

mp.events.add('entityStreamIn', (entity) => {
	if(entity) {
		//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> Streamed Entity Type: "+entity.type+"</span>");
		switch(entity.type) {
			case 'player':
				// Синхронизация ранга без нагрузок
				if(typeof(entity.getVariable("player.fraction")) !== "undefined") {
					let myFraction = entity.getVariable("player.fraction");
					if(typeof(myFraction.id) !== "undefined") {
						if(typeof(mp.world.data.fractions) !== "undefined") {
							if(typeof(mp.world.data.fractions[myFraction.id]) !== "undefined") {
								if(typeof(mp.world.data.fractions[myFraction.id].settings) !== "undefined") {
									let fracSettings = mp.world.data.fractions[myFraction.id].settings;
									if(typeof(fracSettings[myFraction.rank.toString()]) !== "undefined") {
										if(typeof(fracSettings[myFraction.rank.toString()].name) !== "undefined") entity.fRankName = fracSettings[myFraction.rank.toString()].name;
									}
								}
							}
						}
					}
				}
				
				//if(hud_browser) chatAPI.sysPush("<span style=\"color:#FF6146;\"> Streamed Player</span>");
				
				/*
				if(entity.getVariable("player.passive")) {
					//entity.setAlpha(200);
					entity.setNoCollision(localPlayer.handle, false);
					localPlayer.setNoCollision(entity.handle, false);
					mp.players.forEachInStreamRange(
						(player, id) => {
							entity.setNoCollision(player.handle, false);
							player.setNoCollision(entity.handle, false);
						}
					);
				}else{
					//entity.resetAlpha();
					entity.setNoCollision(localPlayer.handle, true);
					localPlayer.setNoCollision(entity.handle, true);
					mp.players.forEachInStreamRange(
						(player, id) => {
							entity.setNoCollision(player.handle, true);
							player.setNoCollision(entity.handle, true);
						}
					);
				}
				*/
				if(typeof(entity.getVariable("player.clothes")) !== "undefined") makePersonage(entity, true, true);
				
				// Иконки игроков
				
				if(typeof(entity.getVariable("player.clothes")) !== "undefined") {
					let playerInv = entity.getVariable("player.clothes");
					if(typeof(entity.getVariable("player.spec")) === "undefined" || !entity.getVariable("player.spec")) {
						if(typeof(playerInv.mask) === "undefined") {
							let pos = entity.position;
							
							let blipColor = 4;
							if(typeof(entity.getVariable("player.fraction")) !== "undefined") {
								let playerFraction = entity.getVariable("player.fraction");
								if(typeof(playerFraction.color) !== "undefined") blipColor = playerFraction.color;
							}
							
							let playerBlip = mp.blips.new(1, new mp.Vector3(pos.x, pos.y, pos.z),
							{
								name: "Какой-то игрок",
								scale: 0.7,
								color: blipColor,
								shortRange: true,
								dimension: 0
							});
							playerBlip.setCategory(7);
							playerBlip.playerHandle = entity.handle;
							
							playerBlipsInStream[entity.id.toString()] = {'blip':playerBlip};
						}
					}
				}
				
				// Поезд
				
				if(typeof(entity.getVariable("player.train")) !== "undefined") {
					let playerTrain = entity.getVariable("player.train");
					if(playerTrain) {
						if(typeof(playerTrain.mID) !== "undefined" && typeof(playerTrain.speed) !== "undefined") createTrain(entity, playerTrain.mID, playerTrain.speed, playerTrain.f, entity.position.x, entity.position.y, entity.position.z);
					}
				}
				
				break;
		}
	}
});

mp.events.add('entityStreamOut', (entity) => {
	if(entity) {
		switch(entity.type) {
			case 'player':
				if(typeof(playerBlipsInStream) !== "undefined") {
					if(typeof(playerBlipsInStream[entity.id.toString()]) !== "undefined") {
						if(typeof(playerBlipsInStream[entity.id.toString()].blip) !== "undefined") {
							let theBlip = playerBlipsInStream[entity.id.toString()].blip;
							//chatAPI.sysPush("<span style=\"color:#FF6146;\"> БЛИПОС: "+JSON.stringify(theBlip)+"</span>");
							if(theBlip) {
								if(mp.blips.exists(theBlip)) theBlip.destroy();
							}
							playerBlipsInStream[entity.id.toString()] = undefined;
							playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
						}
					}
				}
				
				if(typeof(entity.train) !== "undefined") {
					if(typeof(entity.train.trains[0]) !== "undefined") mp.game.vehicle.deleteMissionTrain(entity.train.trains[0]);
					delete entity.train;
				}
				break;
		}
	}
});

mp.events.addDataHandler("player.blocks", function (entity, value, oldValue) {
	if(entity && value) {
		if(entity.handle != 0) {
			if(!oldValue) {
				if(typeof(value.dick) !== "undefined") makePersonage(entity, true, true);
			}else{
				if(typeof(oldValue.dick) !== "undefined") {
					if(typeof(value.dick) !== "undefined") {
						if(oldValue.dick != value.dick) makePersonage(entity, true, true);
					}else{
						makePersonage(entity, true, true);
					}
				}else{
					if(typeof(value.dick) !== "undefined") makePersonage(entity, true, true);
				}
			}
		}
	}
});

mp.events.addDataHandler("player.clothes", function (entity, value, oldValue) {
	if(entity && value) {
		if(entity.handle != 0) {
			if(typeof(value) !== "undefined") {
				if(entity != localPlayer) {
					let playerClothes = value;
					if(typeof(playerClothes.mask) === "undefined") {
						let pos = entity.position;
						
						let blipColor = 4;
						if(typeof(entity.getVariable("player.fraction")) !== "undefined") {
							let playerFraction = entity.getVariable("player.fraction");
							if(typeof(playerFraction.color) !== "undefined") blipColor = playerFraction.color;
						}
						
						let playerBlip = mp.blips.new(1, new mp.Vector3(pos.x, pos.y, pos.z),
						{
							name: "Какой-то игрок",
							scale: 0.7,
							color: blipColor,
							shortRange: true,
							dimension: 0
						});
						playerBlip.setCategory(7);
						playerBlip.playerHandle = entity.handle;
						
						playerBlipsInStream[entity.id.toString()] = {'blip':playerBlip};
					}else{
						if(typeof(playerBlipsInStream[entity.id.toString()]) !== "undefined") {
							if(typeof(playerBlipsInStream[entity.id.toString()].blip) !== "undefined") {
								let theBlip = playerBlipsInStream[entity.id.toString()].blip;
								if(theBlip) {
									if(mp.blips.exists(theBlip)) theBlip.destroy();
									playerBlipsInStream[entity.id.toString()] = undefined;
									playerBlipsInStream = JSON.parse(JSON.stringify(playerBlipsInStream));
								}
							}
						}
					}
				}
			}
			
			if(!oldValue) {
				makePersonage(entity, true, true);
			}else{
				let isMakePersonage = false;
				if(typeof(oldValue.mask) !== "undefined") {
					if(typeof(value.mask) !== "undefined") {
						if(oldValue.mask != value.mask) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.mask) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.bag) !== "undefined") {
					if(typeof(value.bag) !== "undefined") {
						if(oldValue.bag != value.bag) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.bag) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.head) !== "undefined") {
					if(typeof(value.head) !== "undefined") {
						if(oldValue.head != value.head) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.head) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.glasses) !== "undefined") {
					if(typeof(value.glasses) !== "undefined") {
						if(oldValue.glasses != value.glasses) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.glasses) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.tors) !== "undefined") {
					if(typeof(value.tors) !== "undefined") {
						if(oldValue.tors != value.tors) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.tors) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.shirt) !== "undefined") {
					if(typeof(value.shirt) !== "undefined") {
						if(oldValue.shirt != value.shirt) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.shirt) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.watch) !== "undefined") {
					if(typeof(value.watch) !== "undefined") {
						if(oldValue.watch != value.watch) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.watch) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.bracelet) !== "undefined") {
					if(typeof(value.bracelet) !== "undefined") {
						if(oldValue.bracelet != value.bracelet) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.bracelet) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.pants) !== "undefined") {
					if(typeof(value.pants) !== "undefined") {
						if(oldValue.pants != value.pants) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.pants) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.shoes) !== "undefined") {
					if(typeof(value.shoes) !== "undefined") {
						if(oldValue.shoes != value.shoes) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.shoes) !== "undefined") isMakePersonage = true;
				}
				if(typeof(oldValue.instrument) !== "undefined") {
					if(typeof(value.instrument) !== "undefined") {
						if(oldValue.instrument != value.instrument) isMakePersonage = true;
					}else{
						isMakePersonage = true;
					}
				}else{
					if(typeof(value.instrument) !== "undefined") isMakePersonage = true;
				}
				if(isMakePersonage) makePersonage(entity, true, true);
				if(entity == localPlayer && inventoryPanel) refreshPedScreen();
			}
		}
	}
});

function makePersonage(entity, isHair, isClothes, tempClothData) {
	if(entity) {
		if(entity.handle != 0) {
			if(typeof(entity.getVariable("player.clothes")) !== "undefined") {
				if(BARBER_ped) return false;
				
				let clothesData = entity.getVariable("player.clothes");
				//let persData = entity.getVariable("player.pers");
				if(typeof(tempClothData) !== "undefined") {
					if(tempClothData) clothesData = tempClothData;
				}
				
				if(isHair) {
					//
				}
				
				if(isClothes) {
					if(entity == localPlayer) fireJob.firesuit = {"mask":false,"head":false,"tors":false,"pants":false,"shoes":false};
					
					if(typeof(tempClothData) === "undefined") {
						entity.clearProp(0); // Шапки
						entity.clearProp(6); // Часы
						entity.clearProp(1); // Очки
						entity.clearProp(7); // Браслеты
						
						entity.setComponentVariation(10, 0, 0, 0);
						if(entity.getParachuteState() == -1) entity.setComponentVariation(5, 0, 0, 0); // Парашюты и сумки
					}else{
						if(!tempClothData) {
							entity.clearProp(0); // Шапки
							entity.clearProp(6); // Часы
							entity.clearProp(1); // Очки
							entity.clearProp(7); // Браслеты
							
							entity.setComponentVariation(10, 0, 0, 0);
							if(entity.getParachuteState() == -1) entity.setComponentVariation(5, 0, 0, 0); // Парашюты и сумки
						}
					}
					
					if(clothesData.npGender == "male") entity.setComponentVariation(8, 15, 0, 0); // Верх (Под одеждой)
					else entity.setComponentVariation(8, 2, 0, 0); // Верх (Под одеждой)
					
					let isDick = false;
					if(entity.getVariable("player.blocks")) {
						if(typeof(entity.getVariable("player.blocks")) !== "undefined") {
							let playerBlocks = entity.getVariable("player.blocks");
							if(playerBlocks) {
								if(playerBlocks.hasOwnProperty("dick") !== null) {
									if(typeof(playerBlocks.dick) !== "undefined") {
										if(typeof(playerBlocks.dick.exp) !== "undefined") {
											isDick = true;
										}
									}
								}
							}
						}
					}
					
					if(typeof(clothesData["bag"]) !== "undefined") {
						switch (clothesData["bag"].hash) {
							case "bag1":
								entity.setComponentVariation(5, 100, 0, 0);
								break;
							case "bag2":
								entity.setComponentVariation(5, 100, 1, 0);
								break;
							case "bag3":
								entity.setComponentVariation(5, 100, 2, 0);
								break;
							case "bag4":
								entity.setComponentVariation(5, 100, 2, 0);
								break;
							case "bag5":
								entity.setComponentVariation(5, 100, 3, 0);
								break;
							case "bag6":
								entity.setComponentVariation(5, 101, 0, 0);
								break;
							case "bag7":
								entity.setComponentVariation(5, 101, 1, 0);
								break;
							case "bag8":
								entity.setComponentVariation(5, 101, 2, 0);
								break;
							case "bag9":
								entity.setComponentVariation(5, 102, 0, 0);
								break;
							case "bag10":
								entity.setComponentVariation(5, 102, 1, 0);
								break;
							case "bag11":
								entity.setComponentVariation(5, 102, 2, 0);
								break;
							case "bag12":
								entity.setComponentVariation(5, 102, 3, 0);
								break;
							case "bag13":
								entity.setComponentVariation(5, 102, 4, 0);
								break;
							case "bag14":
								entity.setComponentVariation(5, 103, 0, 0);
								break;
							case "bag15":
								entity.setComponentVariation(5, 103, 1, 0);
								break;
							case "bag16":
								entity.setComponentVariation(5, 104, 0, 0);
								break;
							case "bag17":
								entity.setComponentVariation(5, 104, 1, 0);
								break;
							case "bag18":
								entity.setComponentVariation(5, 104, 2, 0);
								break;
							case "bag19":
								entity.setComponentVariation(5, 104, 3, 0);
								break;
							case "bag20":
								entity.setComponentVariation(5, 105, 0, 0);
								break;
							case "bag21":
								entity.setComponentVariation(5, 105, 1, 0);
								break;
							case "bag22":
								entity.setComponentVariation(5, 105, 2, 0);
								break;
							case "bag23":
								entity.setComponentVariation(5, 106, 0, 0);
								break;
							case "bag24":
								entity.setComponentVariation(5, 106, 1, 0);
								break;
							case "bag25":
								entity.setComponentVariation(5, 106, 2, 0);
								break;
							case "bag26":
								entity.setComponentVariation(5, 107, 0, 0);
								break;
							case "bag27":
								entity.setComponentVariation(5, 107, 1, 0);
								break;
							case "bag28":
								entity.setComponentVariation(5, 108, 0, 0);
								break;
							case "bag29":
								entity.setComponentVariation(5, 108, 1, 0);
								break;
							case "bag30":
								entity.setComponentVariation(5, 108, 2, 0);
								break;
							case "bag31":
								entity.setComponentVariation(5, 109, 0, 0);
								break;
							case "bag32":
								entity.setComponentVariation(5, 109, 1, 0);
								break;
							case "bag33":
								entity.setComponentVariation(5, 109, 2, 0);
								break;
							case "bag34":
								entity.setComponentVariation(5, 109, 3, 0);
								break;
							case "bag35":
								entity.setComponentVariation(5, 109, 4, 0);
								break;
							case "bag36":
								entity.setComponentVariation(5, 109, 5, 0);
								break;
							case "bag37":
								entity.setComponentVariation(5, 109, 6, 0);
								break;
							case "bag38":
								entity.setComponentVariation(5, 109, 7, 0);
								break;
							case "bag39":
								entity.setComponentVariation(5, 109, 8, 0);
								break;
							case "bag40":
								entity.setComponentVariation(5, 110, 0, 0);
								break;
							case "bag41":
								entity.setComponentVariation(5, 110, 1, 0);
								break;
							case "bag42":
								entity.setComponentVariation(5, 110, 2, 0);
								break;
							case "bag43":
								entity.setComponentVariation(5, 111, 0, 0);
								break;
							case "bag44":
								entity.setComponentVariation(5, 111, 1, 0);
								break;
							case "bag45":
								entity.setComponentVariation(5, 111, 2, 0);
								break;
							case "bag46":
								entity.setComponentVariation(5, 112, 0, 0);
								break;
							case "bag47":
								entity.setComponentVariation(5, 113, 0, 0);
								break;
							case "bag48":
								entity.setComponentVariation(5, 113, 1, 0);
								break;
						}
					}else{
						entity.setComponentVariation(5, 0, 0, 0);
					}
					
					if(typeof(clothesData["instrument"]) !== "undefined") {
						if(clothesData["instrument"].hash == "aqualang") {
							entity.setComponentVariation(1, 0, 0, 0);
							if(clothesData.npGender == "male") {
								entity.setComponentVariation(3, 1, 0, 0); // Торс
								entity.setComponentVariation(8, 151, 0, 0); // Акваланг
								entity.setComponentVariation(11, 49, 0, 0); // Верх
								entity.setComponentVariation(4, 94, 0, 0); // Штаны
								entity.setComponentVariation(6, 67, 0, 0); // Ласты
							}else{
								entity.setComponentVariation(3, 3, 0, 0); // Торс
								entity.setComponentVariation(8, 187, 0, 0); // Акваланг
								entity.setComponentVariation(11, 42, 0, 0); // Верх
								entity.setComponentVariation(4, 97, 0, 0); // Штаны
								entity.setComponentVariation(6, 70, 0, 0); // Ласты
							}
							
							return false;
						}else if(clothesData["instrument"].hash == "badrod") {
							if(!entity.vehicle) {
								if(clothesData.npGender == "male") {
									if(entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_a") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_b") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_c") > 0) entity.setComponentVariation(10, 85+40, 0, 0); // Декали
									else entity.setComponentVariation(10, 84+50, 0, 0); // Декали
								}else{
									if(entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_a") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_b") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_c") > 0) entity.setComponentVariation(10, 94+39, 0, 0); // Декали
									else entity.setComponentVariation(10, 93+51, 0, 0); // Декали
								}
							}
						}else if(clothesData["instrument"].hash == "rod") {
							if(!entity.vehicle) {
								if(clothesData.npGender == "male") {
									if(entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_a") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_b") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_c") > 0) entity.setComponentVariation(10, 80+40, 0, 0); // Декали
									else entity.setComponentVariation(10, 81+50, 0, 0); // Декали
								}else{
									if(entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_a") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_b") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_c") > 0) entity.setComponentVariation(10, 89+39, 0, 0); // Декали
									else entity.setComponentVariation(10, 90+51, 0, 0); // Декали
								}
							}
						}else if(clothesData["instrument"].hash == "spinning") {
							if(!entity.vehicle) {
								if(clothesData.npGender == "male") {
									if(entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_a") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_b") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_c") > 0) entity.setComponentVariation(10, 83+40, 0, 0); // Декали
									else entity.setComponentVariation(10, 82+50, 0, 0); // Декали
								}else{
									if(entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_a") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_b") > 0 || entity.getAnimCurrentTime("amb@world_human_stand_fishing@idle_a", "idle_c") > 0) entity.setComponentVariation(10, 92+39, 0, 0); // Декали
									else entity.setComponentVariation(10, 91+51, 0, 0); // Декали
								}
							}
						}else if(clothesData["instrument"].hash == "zhezl") {
							if(!entity.vehicle) {
								if(clothesData.npGender == "male") entity.setComponentVariation(10, 86+50, 0, 0); // Декали
								else entity.setComponentVariation(10, 95+51, 0, 0); // Декали
							}
						}else if(clothesData["instrument"].hash == "hunterknife") {
							if(!entity.vehicle) {
								if(clothesData.npGender == "male") entity.setComponentVariation(10, 87+50, 0, 0); // Декали
								else entity.setComponentVariation(10, 96+51, 0, 0); // Декали
							}
						}else if(clothesData["instrument"].hash == "parachute") {
							if(!entity.vehicle) entity.setComponentVariation(5, 31, 0, 0); // Парашюты и сумки
						}
					}
					
					if(isDick) {
						entity.setComponentVariation(1, 190+masksAdd, 0, 0);
					}else{
						if(typeof(clothesData["mask"]) !== "undefined") {
							switch (clothesData["mask"].hash) {
								case "mask1":
									entity.setComponentVariation(1, 11, 0, 0);
									break;
								case "mask2":
									entity.setComponentVariation(1, 11, 1, 0);
									break;
								case "mask3":
									entity.setComponentVariation(1, 11, 2, 0);
									break;
								case "mask4":
									entity.setComponentVariation(1, 51, 0, 0);
									break;
								case "mask5":
									entity.setComponentVariation(1, 51, 1, 0);
									break;
								case "mask6":
									entity.setComponentVariation(1, 51, 2, 0);
									break;
								case "mask7":
									entity.setComponentVariation(1, 51, 3, 0);
									break;
								case "mask8":
									entity.setComponentVariation(1, 51, 4, 0);
									break;
								case "mask9":
									entity.setComponentVariation(1, 51, 5, 0);
									break;
								case "mask10":
									entity.setComponentVariation(1, 51, 6, 0);
									break;
								case "mask11":
									entity.setComponentVariation(1, 51, 7, 0);
									break;
								case "mask12":
									entity.setComponentVariation(1, 51, 8, 0);
									break;
								case "mask13":
									entity.setComponentVariation(1, 51, 9, 0);
									break;
								case "mask14":
									entity.setComponentVariation(1, 37, 0, 0);
									break;
								case "mask15":
									entity.setComponentVariation(1, 54, 0, 0);
									break;
								case "mask16":
									entity.setComponentVariation(1, 54, 1, 0);
									break;
								case "mask17":
									entity.setComponentVariation(1, 54, 2, 0);
									break;
								case "mask18":
									entity.setComponentVariation(1, 54, 3, 0);
									break;
								case "mask19":
									entity.setComponentVariation(1, 54, 4, 0);
									break;
								case "mask20":
									entity.setComponentVariation(1, 54, 5, 0);
									break;
								case "mask21":
									entity.setComponentVariation(1, 54, 6, 0);
									break;
								case "mask22":
									entity.setComponentVariation(1, 54, 7, 0);
									break;
								case "mask23":
									entity.setComponentVariation(1, 54, 8, 0);
									break;
								case "mask24":
									entity.setComponentVariation(1, 54, 9, 0);
									break;
								case "mask25":
									entity.setComponentVariation(1, 54, 10, 0);
									break;
								case "mask26":
									entity.setComponentVariation(1, 3, 0, 0);
									break;
								case "mask27":
									entity.setComponentVariation(1, 7, 0, 0);
									break;
								case "mask28":
									entity.setComponentVariation(1, 7, 1, 0);
									break;
								case "mask29":
									entity.setComponentVariation(1, 7, 2, 0);
									break;
								case "mask30":
									entity.setComponentVariation(1, 9, 0, 0);
									break;
								case "mask31":
									entity.setComponentVariation(1, 13, 0, 0);
									break;
								case "mask32":
									entity.setComponentVariation(1, 17, 0, 0);
									break;
								case "mask33":
									entity.setComponentVariation(1, 17, 1, 0);
									break;
								case "mask34":
									entity.setComponentVariation(1, 18, 0, 0);
									break;
								case "mask35":
									entity.setComponentVariation(1, 18, 1, 0);
									break;
								case "mask36":
									entity.setComponentVariation(1, 19, 0, 0);
									break;
								case "mask37":
									entity.setComponentVariation(1, 19, 1, 0);
									break;
								case "mask38":
									entity.setComponentVariation(1, 20, 0, 0);
									break;
								case "mask39":
									entity.setComponentVariation(1, 20, 1, 0);
									break;
								case "mask40":
									entity.setComponentVariation(1, 36, 0, 0);
									break;
								case "mask41":
									entity.setComponentVariation(1, 46, 0, 0);
									break;
								case "mask42":
									entity.setComponentVariation(1, 8, 0, 0);
									break;
								case "mask43":
									entity.setComponentVariation(1, 8, 1, 0);
									break;
								case "mask44":
									entity.setComponentVariation(1, 8, 2, 0);
									break;
								case "mask45":
									entity.setComponentVariation(1, 10, 0, 0);
									break;
								case "mask46":
									entity.setComponentVariation(1, 31, 0, 0);
									break;
								case "mask47":
									entity.setComponentVariation(1, 84, 0, 0);
									break;
								case "mask48":
									entity.setComponentVariation(1, 175, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.mask = true;
									break;
							}
						}else{
							entity.setComponentVariation(1, 0, 0, 0);
						}
					}
					
					let isSetHair = false;
					if(typeof(clothesData["head"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							switch (clothesData["head"].hash) {
								default:
									if(typeof(clothesData.npHair) !== "undefined") entity.setComponentVariation(2, parseInt(clothesData.npHair), 0, 0);
									break;
								case "head1":
									entity.setPropIndex(0, 2, 0, true);
									break;
								case "head2":
									entity.setPropIndex(0, 22, 0, true);
									break;
								case "head3":
									entity.setPropIndex(0, 22, 1, true);
									break;
								case "head4":
									entity.setPropIndex(0, 23, 0, true);
									break;
								case "head5":
									entity.setPropIndex(0, 40, 0, true);
									break;
								case "head6":
									entity.setPropIndex(0, 40, 1, true);
									break;
								case "head7":
									entity.setPropIndex(0, 40, 2, true);
									break;
								case "head8":
									entity.setPropIndex(0, 40, 3, true);
									break;
								case "head9":
									entity.setPropIndex(0, 40, 4, true);
									break;
								case "head10":
									entity.setPropIndex(0, 40, 5, true);
									break;
								case "head11":
									entity.setPropIndex(0, 40, 6, true);
									break;
								case "head12":
									entity.setPropIndex(0, 40, 7, true);
									break;
								case "head13":
									entity.setPropIndex(0, 41, 0, true);
									break;
								case "head14":
									entity.setPropIndex(0, 42, 0, true);
									break;
								case "head15":
									entity.setPropIndex(0, 42, 1, true);
									break;
								case "head16":
									entity.setPropIndex(0, 42, 2, true);
									break;
								case "head17":
									entity.setPropIndex(0, 42, 3, true);
									break;
								case "head18":
									entity.setPropIndex(0, 97, 0, true);
									break;
								case "head19":
									entity.setPropIndex(0, 97, 1, true);
									break;
								case "head20":
									entity.setPropIndex(0, 97, 2, true);
									break;
								case "head21":
									entity.setPropIndex(0, 97, 3, true);
									break;
								case "head22":
									entity.setPropIndex(0, 99, 0, true);
									break;
								case "head23":
									entity.setPropIndex(0, 101, 0, true);
									break;
								case "head24":
									entity.setPropIndex(0, 100, 0, true);
									break;
								case "head25":
									isSetHair = true;
									entity.setPropIndex(0, 154+maleHeadAdd, 0, true);
									break;
								case "head26":
									isSetHair = true;
									entity.setPropIndex(0, 155+maleHeadAdd, 0, true);
									break;
								case "head27":
									isSetHair = true;
									entity.setPropIndex(0, 155+maleHeadAdd, 1, true);
									break;
								case "head28":
									isSetHair = true;
									entity.setPropIndex(0, 155+maleHeadAdd, 2, true);
									break;
								case "head29":
									isSetHair = true;
									entity.setPropIndex(0, 155+maleHeadAdd, 3, true);
									break;
								case "head30":
									isSetHair = true;
									entity.setPropIndex(0, 155+maleHeadAdd, 4, true);
									break;
								case "head31":
									isSetHair = true;
									entity.setPropIndex(0, 156+maleHeadAdd, 0, true);
									break;
								case "head32":
									isSetHair = true;
									entity.setPropIndex(0, 156+maleHeadAdd, 1, true);
									break;
								case "head33":
									isSetHair = true;
									entity.setPropIndex(0, 156+maleHeadAdd, 2, true);
									break;
								case "head34":
									isSetHair = true;
									entity.setPropIndex(0, 157+maleHeadAdd, 0, true);
									break;
								case "head35":
									isSetHair = true;
									entity.setPropIndex(0, 157+maleHeadAdd, 1, true);
									break;
								case "head36":
									isSetHair = true;
									entity.setPropIndex(0, 157+maleHeadAdd, 2, true);
									break;
								case "head37":
									isSetHair = true;
									entity.setPropIndex(0, 157+maleHeadAdd, 3, true);
									break;
								case "head39":
									isSetHair = true;
									entity.setPropIndex(0, 158+maleHeadAdd, 0, true);
									break;
								case "head40":
									isSetHair = true;
									entity.setPropIndex(0, 159+maleHeadAdd, 0, true);
									break;
								case "head41":
									isSetHair = true;
									entity.setPropIndex(0, 159+maleHeadAdd, 1, true);
									break;
								case "head42":
									isSetHair = true;
									entity.setPropIndex(0, 159+maleHeadAdd, 2, true);
									break;
								case "head43":
									isSetHair = true;
									entity.setPropIndex(0, 159+maleHeadAdd, 3, true);
									break;
								case "head44":
									isSetHair = true;
									entity.setPropIndex(0, 159+maleHeadAdd, 4, true);
									break;
								case "head45":
									isSetHair = true;
									entity.setPropIndex(0, 160+maleHeadAdd, 0, true);
									break;
								case "head46":
									isSetHair = true;
									entity.setPropIndex(0, 160+maleHeadAdd, 1, true);
									break;
								case "head47":
									isSetHair = true;
									entity.setPropIndex(0, 161+maleHeadAdd, 0, true);
									break;
								case "head48":
									isSetHair = true;
									entity.setPropIndex(0, 162+maleHeadAdd, 0, true);
									break;
								case "head49":
									isSetHair = true;
									entity.setPropIndex(0, 162+maleHeadAdd, 1, true);
									break;
								case "head50":
									isSetHair = true;
									entity.setPropIndex(0, 163+maleHeadAdd, 0, true);
									break;
								case "head51":
									isSetHair = true;
									entity.setPropIndex(0, 164+maleHeadAdd, 0, true);
									break;
								case "head52":
									isSetHair = true;
									entity.setPropIndex(0, 164+maleHeadAdd, 1, true);
									break;
								case "head53":
									isSetHair = true;
									entity.setPropIndex(0, 164+maleHeadAdd, 2, true);
									break;
								case "head54":
									isSetHair = true;
									entity.setPropIndex(0, 165+maleHeadAdd, 0, true);
									break;
								case "head55":
									isSetHair = true;
									entity.setPropIndex(0, 165+maleHeadAdd, 1, true);
									break;
								case "head56":
									isSetHair = true;
									entity.setPropIndex(0, 165+maleHeadAdd, 2, true);
									break;
								case "head57":
									isSetHair = true;
									entity.setPropIndex(0, 166+maleHeadAdd, 0, true);
									break;
								case "head58":
									isSetHair = true;
									entity.setPropIndex(0, 167+maleHeadAdd, 0, true);
									break;
								case "head59":
									isSetHair = true;
									entity.setPropIndex(0, 167+maleHeadAdd, 1, true);
									break;
								case "head60":
									isSetHair = true;
									entity.setPropIndex(0, 167+maleHeadAdd, 2, true);
									break;
								case "head61":
									isSetHair = true;
									entity.setPropIndex(0, 168+maleHeadAdd, 0, true);
									break;
								case "head62":
									isSetHair = true;
									entity.setPropIndex(0, 168+maleHeadAdd, 1, true);
									break;
								case "head63":
									isSetHair = true;
									entity.setPropIndex(0, 168+maleHeadAdd, 2, true);
									break;
								case "head64":
									isSetHair = true;
									entity.setPropIndex(0, 169+maleHeadAdd, 0, true);
									break;
								case "head65":
									isSetHair = true;
									entity.setPropIndex(0, 170+maleHeadAdd, 0, true);
									break;
								case "head66":
									isSetHair = true;
									entity.setPropIndex(0, 170+maleHeadAdd, 1, true);
									break;
								case "head67":
									isSetHair = true;
									entity.setPropIndex(0, 170+maleHeadAdd, 2, true);
									break;
								case "head68":
									isSetHair = true;
									entity.setPropIndex(0, 170+maleHeadAdd, 3, true);
									break;
								case "head69":
									isSetHair = true;
									entity.setPropIndex(0, 170+maleHeadAdd, 4, true);
									break;
								case "head70":
									isSetHair = true;
									entity.setPropIndex(0, 171+maleHeadAdd, 0, true);
									break;
								case "head71":
									isSetHair = true;
									entity.setPropIndex(0, 171+maleHeadAdd, 1, true);
									break;
								case "head72":
									isSetHair = true;
									entity.setPropIndex(0, 171+maleHeadAdd, 2, true);
									break;
								case "head73":
									isSetHair = true;
									entity.setPropIndex(0, 172+maleHeadAdd, 0, true);
									break;
								case "head74":
									entity.setPropIndex(0, 138, 0, true);
									if(entity == localPlayer) fireJob.firesuit.head = true;
									break;
							}
						}else{
							switch (clothesData["head"].hash) {
								case "head1":
									entity.setPropIndex(0, 5, 0, true);
									break;
								case "head2":
									entity.setPropIndex(0, 23, 0, true);
									break;
								case "head3":
									entity.setPropIndex(0, 23, 1, true);
									break;
								case "head4":
									entity.setPropIndex(0, 24, 0, true);
									break;
								case "head5":
									entity.setPropIndex(0, 25, 0, true);
									break;
								case "head6":
									entity.setPropIndex(0, 96, 0, true);
									break;
								case "head7":
									entity.setPropIndex(0, 96, 1, true);
									break;
								case "head8":
									entity.setPropIndex(0, 96, 2, true);
									break;
								case "head9":
									entity.setPropIndex(0, 96, 3, true);
									break;
								case "head10":
									entity.setPropIndex(0, 97, 0, true);
									break;
								case "head11":
									entity.setPropIndex(0, 98, 0, true);
									break;
								case "head12":
									entity.setPropIndex(0, 99, 0, true);
									break;
								case "head13":
									entity.setPropIndex(0, 100, 0, true);
									break;
								case "head14":
									isSetHair = true;
									entity.setPropIndex(0, 152+femaleHeadAdd, 0, true);
									break;
								case "head15":
									entity.setPropIndex(0, 137, 0, true);
									if(entity == localPlayer) fireJob.firesuit.head = true;
									break;
							}
						}
					}else{
						entity.setPropIndex(0, -1, 0, true);
						entity.setComponentVariation(2, parseInt(clothesData.npHair), 0, 0);
					}
					if(isSetHair && typeof(clothesData.npHair) !== "undefined") entity.setComponentVariation(2, 0, 0, 0);
					
					if(typeof(clothesData["glasses"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							switch (clothesData["glasses"].hash) {
								case "glasses1":
									entity.setPropIndex(1, 2, 0, true);
									break;
								case "glasses2":
									entity.setPropIndex(1, 2, 1, true);
									break;
								case "glasses3":
									entity.setPropIndex(1, 2, 2, true);
									break;
								case "glasses4":
									entity.setPropIndex(1, 2, 3, true);
									break;
								case "glasses5":
									entity.setPropIndex(1, 2, 4, true);
									break;
								case "glasses6":
									entity.setPropIndex(1, 2, 5, true);
									break;
								case "glasses7":
									entity.setPropIndex(1, 2, 6, true);
									break;
								case "glasses8":
									entity.setPropIndex(1, 2, 7, true);
									break;
								case "glasses9":
									entity.setPropIndex(1, 2, 8, true);
									break;
								case "glasses10":
									entity.setPropIndex(1, 2, 9, true);
									break;
								case "glasses11":
									entity.setPropIndex(1, 3, 0, true);
									break;
								case "glasses12":
									entity.setPropIndex(1, 3, 1, true);
									break;
								case "glasses13":
									entity.setPropIndex(1, 3, 2, true);
									break;
								case "glasses14":
									entity.setPropIndex(1, 3, 3, true);
									break;
								case "glasses15":
									entity.setPropIndex(1, 3, 4, true);
									break;
								case "glasses16":
									entity.setPropIndex(1, 3, 5, true);
									break;
								case "glasses17":
									entity.setPropIndex(1, 3, 6, true);
									break;
								case "glasses18":
									entity.setPropIndex(1, 3, 7, true);
									break;
								case "glasses19":
									entity.setPropIndex(1, 3, 8, true);
									break;
								case "glasses20":
									entity.setPropIndex(1, 3, 9, true);
									break;
								case "glasses21":
									entity.setPropIndex(1, 4, 0, true);
									break;
								case "glasses22":
									entity.setPropIndex(1, 4, 1, true);
									break;
								case "glasses23":
									entity.setPropIndex(1, 4, 2, true);
									break;
								case "glasses24":
									entity.setPropIndex(1, 4, 3, true);
									break;
								case "glasses25":
									entity.setPropIndex(1, 4, 4, true);
									break;
								case "glasses26":
									entity.setPropIndex(1, 4, 5, true);
									break;
								case "glasses27":
									entity.setPropIndex(1, 4, 6, true);
									break;
								case "glasses28":
									entity.setPropIndex(1, 4, 7, true);
									break;
								case "glasses29":
									entity.setPropIndex(1, 4, 8, true);
									break;
								case "glasses30":
									entity.setPropIndex(1, 4, 9, true);
									break;
								case "glasses31":
									entity.setPropIndex(1, 5, 0, true);
									break;
								case "glasses32":
									entity.setPropIndex(1, 5, 1, true);
									break;
								case "glasses33":
									entity.setPropIndex(1, 5, 2, true);
									break;
								case "glasses34":
									entity.setPropIndex(1, 5, 3, true);
									break;
								case "glasses35":
									entity.setPropIndex(1, 5, 4, true);
									break;
								case "glasses36":
									entity.setPropIndex(1, 5, 5, true);
									break;
								case "glasses37":
									entity.setPropIndex(1, 5, 6, true);
									break;
								case "glasses38":
									entity.setPropIndex(1, 5, 7, true);
									break;
								case "glasses39":
									entity.setPropIndex(1, 5, 8, true);
									break;
								case "glasses40":
									entity.setPropIndex(1, 5, 9, true);
									break;
								case "glasses41":
									entity.setPropIndex(1, 7, 0, true);
									break;
								case "glasses42":
									entity.setPropIndex(1, 7, 1, true);
									break;
								case "glasses43":
									entity.setPropIndex(1, 7, 2, true);
									break;
								case "glasses44":
									entity.setPropIndex(1, 7, 3, true);
									break;
								case "glasses45":
									entity.setPropIndex(1, 7, 4, true);
									break;
								case "glasses46":
									entity.setPropIndex(1, 7, 5, true);
									break;
								case "glasses47":
									entity.setPropIndex(1, 7, 6, true);
									break;
								case "glasses48":
									entity.setPropIndex(1, 7, 7, true);
									break;
								case "glasses49":
									entity.setPropIndex(1, 7, 8, true);
									break;
								case "glasses50":
									entity.setPropIndex(1, 7, 9, true);
									break;
								case "glasses51":
									entity.setPropIndex(1, 8, 0, true);
									break;
								case "glasses52":
									entity.setPropIndex(1, 8, 1, true);
									break;
								case "glasses53":
									entity.setPropIndex(1, 8, 2, true);
									break;
								case "glasses54":
									entity.setPropIndex(1, 8, 3, true);
									break;
								case "glasses55":
									entity.setPropIndex(1, 8, 4, true);
									break;
								case "glasses56":
									entity.setPropIndex(1, 8, 5, true);
									break;
								case "glasses57":
									entity.setPropIndex(1, 8, 6, true);
									break;
								case "glasses58":
									entity.setPropIndex(1, 8, 7, true);
									break;
								case "glasses59":
									entity.setPropIndex(1, 8, 8, true);
									break;
								case "glasses60":
									entity.setPropIndex(1, 8, 9, true);
									break;
								case "glasses61":
									entity.setPropIndex(1, 9, 0, true);
									break;
								case "glasses62":
									entity.setPropIndex(1, 9, 1, true);
									break;
								case "glasses63":
									entity.setPropIndex(1, 9, 2, true);
									break;
								case "glasses64":
									entity.setPropIndex(1, 9, 3, true);
									break;
								case "glasses65":
									entity.setPropIndex(1, 9, 4, true);
									break;
								case "glasses66":
									entity.setPropIndex(1, 9, 5, true);
									break;
								case "glasses67":
									entity.setPropIndex(1, 9, 6, true);
									break;
								case "glasses68":
									entity.setPropIndex(1, 9, 7, true);
									break;
								case "glasses69":
									entity.setPropIndex(1, 9, 8, true);
									break;
								case "glasses70":
									entity.setPropIndex(1, 9, 9, true);
									break;
								case "glasses71":
									entity.setPropIndex(1, 10, 0, true);
									break;
								case "glasses72":
									entity.setPropIndex(1, 10, 1, true);
									break;
								case "glasses73":
									entity.setPropIndex(1, 10, 2, true);
									break;
								case "glasses74":
									entity.setPropIndex(1, 10, 3, true);
									break;
								case "glasses75":
									entity.setPropIndex(1, 10, 4, true);
									break;
								case "glasses76":
									entity.setPropIndex(1, 10, 5, true);
									break;
								case "glasses77":
									entity.setPropIndex(1, 10, 6, true);
									break;
								case "glasses78":
									entity.setPropIndex(1, 10, 7, true);
									break;
								case "glasses79":
									entity.setPropIndex(1, 10, 8, true);
									break;
								case "glasses80":
									entity.setPropIndex(1, 10, 9, true);
									break;
								case "glasses81":
									entity.setPropIndex(1, 12, 0, true);
									break;
								case "glasses82":
									entity.setPropIndex(1, 12, 1, true);
									break;
								case "glasses83":
									entity.setPropIndex(1, 12, 2, true);
									break;
								case "glasses84":
									entity.setPropIndex(1, 12, 3, true);
									break;
								case "glasses85":
									entity.setPropIndex(1, 12, 4, true);
									break;
								case "glasses86":
									entity.setPropIndex(1, 12, 5, true);
									break;
								case "glasses87":
									entity.setPropIndex(1, 12, 6, true);
									break;
								case "glasses88":
									entity.setPropIndex(1, 12, 7, true);
									break;
								case "glasses89":
									entity.setPropIndex(1, 12, 8, true);
									break;
								case "glasses90":
									entity.setPropIndex(1, 12, 9, true);
									break;
								case "glasses91":
									entity.setPropIndex(1, 13, 0, true);
									break;
								case "glasses92":
									entity.setPropIndex(1, 13, 1, true);
									break;
								case "glasses93":
									entity.setPropIndex(1, 13, 2, true);
									break;
								case "glasses94":
									entity.setPropIndex(1, 13, 3, true);
									break;
								case "glasses95":
									entity.setPropIndex(1, 13, 4, true);
									break;
								case "glasses96":
									entity.setPropIndex(1, 13, 5, true);
									break;
								case "glasses97":
									entity.setPropIndex(1, 13, 6, true);
									break;
								case "glasses98":
									entity.setPropIndex(1, 13, 7, true);
									break;
								case "glasses99":
									entity.setPropIndex(1, 13, 8, true);
									break;
								case "glasses100":
									entity.setPropIndex(1, 13, 9, true);
									break;
								case "glasses101":
									entity.setPropIndex(1, 15, 0, true);
									break;
								case "glasses102":
									entity.setPropIndex(1, 15, 1, true);
									break;
								case "glasses103":
									entity.setPropIndex(1, 15, 2, true);
									break;
								case "glasses104":
									entity.setPropIndex(1, 15, 3, true);
									break;
								case "glasses105":
									entity.setPropIndex(1, 15, 4, true);
									break;
								case "glasses106":
									entity.setPropIndex(1, 15, 5, true);
									break;
								case "glasses107":
									entity.setPropIndex(1, 15, 6, true);
									break;
								case "glasses108":
									entity.setPropIndex(1, 15, 7, true);
									break;
								case "glasses109":
									entity.setPropIndex(1, 15, 8, true);
									break;
								case "glasses110":
									entity.setPropIndex(1, 15, 9, true);
									break;
								case "glasses111":
									entity.setPropIndex(1, 16, 0, true);
									break;
								case "glasses112":
									entity.setPropIndex(1, 16, 1, true);
									break;
								case "glasses113":
									entity.setPropIndex(1, 16, 2, true);
									break;
								case "glasses114":
									entity.setPropIndex(1, 16, 3, true);
									break;
								case "glasses115":
									entity.setPropIndex(1, 16, 4, true);
									break;
								case "glasses116":
									entity.setPropIndex(1, 16, 5, true);
									break;
								case "glasses117":
									entity.setPropIndex(1, 16, 6, true);
									break;
								case "glasses118":
									entity.setPropIndex(1, 16, 7, true);
									break;
								case "glasses119":
									entity.setPropIndex(1, 16, 8, true);
									break;
								case "glasses120":
									entity.setPropIndex(1, 16, 9, true);
									break;
								case "glasses121":
									entity.setPropIndex(1, 17, 0, true);
									break;
								case "glasses122":
									entity.setPropIndex(1, 17, 1, true);
									break;
								case "glasses123":
									entity.setPropIndex(1, 17, 2, true);
									break;
								case "glasses124":
									entity.setPropIndex(1, 17, 3, true);
									break;
								case "glasses125":
									entity.setPropIndex(1, 17, 4, true);
									break;
								case "glasses126":
									entity.setPropIndex(1, 17, 5, true);
									break;
								case "glasses127":
									entity.setPropIndex(1, 17, 6, true);
									break;
								case "glasses128":
									entity.setPropIndex(1, 17, 7, true);
									break;
								case "glasses129":
									entity.setPropIndex(1, 17, 8, true);
									break;
								case "glasses130":
									entity.setPropIndex(1, 17, 9, true);
									break;
								case "glasses131":
									entity.setPropIndex(1, 18, 0, true);
									break;
								case "glasses132":
									entity.setPropIndex(1, 18, 1, true);
									break;
								case "glasses133":
									entity.setPropIndex(1, 18, 2, true);
									break;
								case "glasses134":
									entity.setPropIndex(1, 18, 3, true);
									break;
								case "glasses135":
									entity.setPropIndex(1, 18, 4, true);
									break;
								case "glasses136":
									entity.setPropIndex(1, 18, 5, true);
									break;
								case "glasses137":
									entity.setPropIndex(1, 18, 6, true);
									break;
								case "glasses138":
									entity.setPropIndex(1, 18, 7, true);
									break;
								case "glasses139":
									entity.setPropIndex(1, 18, 8, true);
									break;
								case "glasses140":
									entity.setPropIndex(1, 18, 9, true);
									break;
								case "glasses141":
									entity.setPropIndex(1, 19, 0, true);
									break;
								case "glasses142":
									entity.setPropIndex(1, 19, 1, true);
									break;
								case "glasses143":
									entity.setPropIndex(1, 19, 2, true);
									break;
								case "glasses144":
									entity.setPropIndex(1, 19, 3, true);
									break;
								case "glasses145":
									entity.setPropIndex(1, 19, 4, true);
									break;
								case "glasses146":
									entity.setPropIndex(1, 19, 5, true);
									break;
								case "glasses147":
									entity.setPropIndex(1, 19, 6, true);
									break;
								case "glasses148":
									entity.setPropIndex(1, 19, 7, true);
									break;
								case "glasses149":
									entity.setPropIndex(1, 19, 8, true);
									break;
								case "glasses150":
									entity.setPropIndex(1, 19, 9, true);
									break;
								case "glasses151":
									entity.setPropIndex(1, 20, 0, true);
									break;
								case "glasses152":
									entity.setPropIndex(1, 20, 1, true);
									break;
								case "glasses153":
									entity.setPropIndex(1, 20, 2, true);
									break;
								case "glasses154":
									entity.setPropIndex(1, 20, 3, true);
									break;
								case "glasses155":
									entity.setPropIndex(1, 20, 4, true);
									break;
								case "glasses156":
									entity.setPropIndex(1, 20, 5, true);
									break;
								case "glasses157":
									entity.setPropIndex(1, 20, 6, true);
									break;
								case "glasses158":
									entity.setPropIndex(1, 20, 7, true);
									break;
								case "glasses159":
									entity.setPropIndex(1, 35+maleGlassesAdd, 0, true);
									break;
								case "glasses160":
									entity.setPropIndex(1, 35+maleGlassesAdd, 1, true);
									break;
								case "glasses161":
									entity.setPropIndex(1, 35+maleGlassesAdd, 2, true);
									break;
								case "glasses162":
									entity.setPropIndex(1, 36+maleGlassesAdd, 0, true);
									break;
								case "glasses163":
									entity.setPropIndex(1, 36+maleGlassesAdd, 1, true);
									break;
								case "glasses164":
									entity.setPropIndex(1, 36+maleGlassesAdd, 2, true);
									break;
								case "glasses165":
									entity.setPropIndex(1, 37+maleGlassesAdd, 0, true);
									break;
								case "glasses166":
									entity.setPropIndex(1, 37+maleGlassesAdd, 1, true);
									break;
								case "glasses167":
									entity.setPropIndex(1, 37+maleGlassesAdd, 2, true);
									break;
								case "glasses168":
									entity.setPropIndex(1, 38+maleGlassesAdd, 0, true);
									break;
								case "glasses169":
									entity.setPropIndex(1, 38+maleGlassesAdd, 1, true);
									break;
								case "glasses170":
									entity.setPropIndex(1, 38+maleGlassesAdd, 2, true);
									break;
								case "glasses171":
									entity.setPropIndex(1, 38+maleGlassesAdd, 3, true);
									break;
								case "glasses172":
									entity.setPropIndex(1, 38+maleGlassesAdd, 4, true);
									break;
								case "glasses173":
									entity.setPropIndex(1, 38+maleGlassesAdd, 5, true);
									break;
								case "glasses174":
									entity.setPropIndex(1, 38+maleGlassesAdd, 6, true);
									break;
								case "glasses175":
									entity.setPropIndex(1, 39+maleGlassesAdd, 0, true);
									break;
								case "glasses176":
									entity.setPropIndex(1, 39+maleGlassesAdd, 1, true);
									break;
								case "glasses177":
									entity.setPropIndex(1, 39+maleGlassesAdd, 2, true);
									break;
								case "glasses178":
									entity.setPropIndex(1, 39+maleGlassesAdd, 3, true);
									break;
								case "glasses179":
									entity.setPropIndex(1, 40+maleGlassesAdd, 0, true);
									break;
								case "glasses180":
									entity.setPropIndex(1, 40+maleGlassesAdd, 1, true);
									break;
								case "glasses181":
									entity.setPropIndex(1, 40+maleGlassesAdd, 2, true);
									break;
								case "glasses182":
									entity.setPropIndex(1, 41+maleGlassesAdd, 0, true);
									break;
								case "glasses183":
									entity.setPropIndex(1, 41+maleGlassesAdd, 1, true);
									break;
								case "glasses184":
									entity.setPropIndex(1, 41+maleGlassesAdd, 2, true);
									break;
								case "glasses185":
									entity.setPropIndex(1, 42+maleGlassesAdd, 0, true);
									break;
								case "glasses186":
									entity.setPropIndex(1, 42+maleGlassesAdd, 1, true);
									break;
								case "glasses187":
									entity.setPropIndex(1, 42+maleGlassesAdd, 2, true);
									break;
								case "glasses188":
									entity.setPropIndex(1, 42+maleGlassesAdd, 3, true);
									break;
								case "glasses189":
									entity.setPropIndex(1, 42+maleGlassesAdd, 4, true);
									break;
								case "glasses190":
									entity.setPropIndex(1, 42+maleGlassesAdd, 5, true);
									break;
								case "glasses191":
									entity.setPropIndex(1, 42+maleGlassesAdd, 6, true);
									break;
								case "glasses192":
									entity.setPropIndex(1, 43+maleGlassesAdd, 0, true);
									break;
								case "glasses193":
									entity.setPropIndex(1, 43+maleGlassesAdd, 1, true);
									break;
								case "glasses194":
									entity.setPropIndex(1, 43+maleGlassesAdd, 2, true);
									break;
								case "glasses195":
									entity.setPropIndex(1, 43+maleGlassesAdd, 3, true);
									break;
								case "glasses196":
									entity.setPropIndex(1, 43+maleGlassesAdd, 4, true);
									break;
								case "glasses197":
									entity.setPropIndex(1, 43+maleGlassesAdd, 5, true);
									break;
								case "glasses198":
									entity.setPropIndex(1, 43+maleGlassesAdd, 6, true);
									break;
								case "glasses199":
									entity.setPropIndex(1, 44+maleGlassesAdd, 0, true);
									break;
								case "glasses200":
									entity.setPropIndex(1, 44+maleGlassesAdd, 1, true);
									break;
								case "glasses201":
									entity.setPropIndex(1, 45+maleGlassesAdd, 0, true);
									break;
								case "glasses202":
									entity.setPropIndex(1, 46+maleGlassesAdd, 0, true);
									break;
								case "glasses203":
									entity.setPropIndex(1, 46+maleGlassesAdd, 1, true);
									break;
								case "glasses204":
									entity.setPropIndex(1, 46+maleGlassesAdd, 2, true);
									break;
								case "glasses205":
									entity.setPropIndex(1, 46+maleGlassesAdd, 3, true);
									break;
							}
						}else{
							switch (clothesData["glasses"].hash) {
								case "glasses1":
									entity.setPropIndex(1, 0, 0, true);
									break;
								case "glasses2":
									entity.setPropIndex(1, 0, 1, true);
									break;
								case "glasses3":
									entity.setPropIndex(1, 0, 2, true);
									break;
								case "glasses4":
									entity.setPropIndex(1, 0, 3, true);
									break;
								case "glasses5":
									entity.setPropIndex(1, 0, 4, true);
									break;
								case "glasses6":
									entity.setPropIndex(1, 0, 5, true);
									break;
								case "glasses7":
									entity.setPropIndex(1, 0, 6, true);
									break;
								case "glasses8":
									entity.setPropIndex(1, 0, 7, true);
									break;
								case "glasses9":
									entity.setPropIndex(1, 0, 8, true);
									break;
								case "glasses10":
									entity.setPropIndex(1, 0, 9, true);
									break;
								case "glasses11":
									entity.setPropIndex(1, 1, 0, true);
									break;
								case "glasses12":
									entity.setPropIndex(1, 1, 1, true);
									break;
								case "glasses13":
									entity.setPropIndex(1, 1, 2, true);
									break;
								case "glasses14":
									entity.setPropIndex(1, 1, 3, true);
									break;
								case "glasses15":
									entity.setPropIndex(1, 1, 4, true);
									break;
								case "glasses16":
									entity.setPropIndex(1, 1, 5, true);
									break;
								case "glasses17":
									entity.setPropIndex(1, 1, 6, true);
									break;
								case "glasses18":
									entity.setPropIndex(1, 1, 7, true);
									break;
								case "glasses19":
									entity.setPropIndex(1, 1, 8, true);
									break;
								case "glasses20":
									entity.setPropIndex(1, 1, 9, true);
									break;
								case "glasses21":
									entity.setPropIndex(1, 2, 0, true);
									break;
								case "glasses22":
									entity.setPropIndex(1, 2, 1, true);
									break;
								case "glasses23":
									entity.setPropIndex(1, 2, 2, true);
									break;
								case "glasses24":
									entity.setPropIndex(1, 2, 3, true);
									break;
								case "glasses25":
									entity.setPropIndex(1, 2, 4, true);
									break;
								case "glasses26":
									entity.setPropIndex(1, 2, 5, true);
									break;
								case "glasses27":
									entity.setPropIndex(1, 2, 6, true);
									break;
								case "glasses28":
									entity.setPropIndex(1, 2, 7, true);
									break;
								case "glasses29":
									entity.setPropIndex(1, 2, 8, true);
									break;
								case "glasses30":
									entity.setPropIndex(1, 2, 9, true);
									break;
								case "glasses31":
									entity.setPropIndex(1, 3, 0, true);
									break;
								case "glasses32":
									entity.setPropIndex(1, 3, 1, true);
									break;
								case "glasses33":
									entity.setPropIndex(1, 3, 2, true);
									break;
								case "glasses34":
									entity.setPropIndex(1, 3, 3, true);
									break;
								case "glasses35":
									entity.setPropIndex(1, 3, 4, true);
									break;
								case "glasses36":
									entity.setPropIndex(1, 3, 5, true);
									break;
								case "glasses37":
									entity.setPropIndex(1, 3, 6, true);
									break;
								case "glasses38":
									entity.setPropIndex(1, 3, 7, true);
									break;
								case "glasses39":
									entity.setPropIndex(1, 3, 8, true);
									break;
								case "glasses40":
									entity.setPropIndex(1, 3, 9, true);
									break;
								case "glasses41":
									entity.setPropIndex(1, 4, 0, true);
									break;
								case "glasses42":
									entity.setPropIndex(1, 4, 1, true);
									break;
								case "glasses43":
									entity.setPropIndex(1, 4, 2, true);
									break;
								case "glasses44":
									entity.setPropIndex(1, 4, 3, true);
									break;
								case "glasses45":
									entity.setPropIndex(1, 4, 4, true);
									break;
								case "glasses46":
									entity.setPropIndex(1, 4, 5, true);
									break;
								case "glasses47":
									entity.setPropIndex(1, 4, 6, true);
									break;
								case "glasses48":
									entity.setPropIndex(1, 4, 7, true);
									break;
								case "glasses49":
									entity.setPropIndex(1, 4, 8, true);
									break;
								case "glasses50":
									entity.setPropIndex(1, 4, 9, true);
									break;
								case "glasses51":
									entity.setPropIndex(1, 6, 0, true);
									break;
								case "glasses52":
									entity.setPropIndex(1, 6, 1, true);
									break;
								case "glasses53":
									entity.setPropIndex(1, 6, 2, true);
									break;
								case "glasses54":
									entity.setPropIndex(1, 6, 3, true);
									break;
								case "glasses55":
									entity.setPropIndex(1, 6, 4, true);
									break;
								case "glasses56":
									entity.setPropIndex(1, 6, 5, true);
									break;
								case "glasses57":
									entity.setPropIndex(1, 6, 6, true);
									break;
								case "glasses58":
									entity.setPropIndex(1, 6, 7, true);
									break;
								case "glasses59":
									entity.setPropIndex(1, 6, 8, true);
									break;
								case "glasses60":
									entity.setPropIndex(1, 6, 9, true);
									break;
								case "glasses61":
									entity.setPropIndex(1, 7, 0, true);
									break;
								case "glasses62":
									entity.setPropIndex(1, 7, 1, true);
									break;
								case "glasses63":
									entity.setPropIndex(1, 7, 2, true);
									break;
								case "glasses64":
									entity.setPropIndex(1, 7, 3, true);
									break;
								case "glasses65":
									entity.setPropIndex(1, 7, 4, true);
									break;
								case "glasses66":
									entity.setPropIndex(1, 7, 5, true);
									break;
								case "glasses67":
									entity.setPropIndex(1, 7, 6, true);
									break;
								case "glasses68":
									entity.setPropIndex(1, 7, 7, true);
									break;
								case "glasses69":
									entity.setPropIndex(1, 7, 8, true);
									break;
								case "glasses70":
									entity.setPropIndex(1, 7, 9, true);
									break;
								case "glasses71":
									entity.setPropIndex(1, 8, 0, true);
									break;
								case "glasses72":
									entity.setPropIndex(1, 8, 1, true);
									break;
								case "glasses73":
									entity.setPropIndex(1, 8, 2, true);
									break;
								case "glasses74":
									entity.setPropIndex(1, 8, 3, true);
									break;
								case "glasses75":
									entity.setPropIndex(1, 8, 4, true);
									break;
								case "glasses76":
									entity.setPropIndex(1, 8, 5, true);
									break;
								case "glasses77":
									entity.setPropIndex(1, 8, 6, true);
									break;
								case "glasses78":
									entity.setPropIndex(1, 8, 7, true);
									break;
								case "glasses79":
									entity.setPropIndex(1, 8, 8, true);
									break;
								case "glasses80":
									entity.setPropIndex(1, 8, 9, true);
									break;
								case "glasses81":
									entity.setPropIndex(1, 9, 0, true);
									break;
								case "glasses82":
									entity.setPropIndex(1, 9, 1, true);
									break;
								case "glasses83":
									entity.setPropIndex(1, 9, 2, true);
									break;
								case "glasses84":
									entity.setPropIndex(1, 9, 3, true);
									break;
								case "glasses85":
									entity.setPropIndex(1, 9, 4, true);
									break;
								case "glasses86":
									entity.setPropIndex(1, 9, 5, true);
									break;
								case "glasses87":
									entity.setPropIndex(1, 9, 6, true);
									break;
								case "glasses88":
									entity.setPropIndex(1, 9, 7, true);
									break;
								case "glasses89":
									entity.setPropIndex(1, 9, 8, true);
									break;
								case "glasses90":
									entity.setPropIndex(1, 9, 9, true);
									break;
								case "glasses91":
									entity.setPropIndex(1, 10, 0, true);
									break;
								case "glasses92":
									entity.setPropIndex(1, 10, 1, true);
									break;
								case "glasses93":
									entity.setPropIndex(1, 10, 2, true);
									break;
								case "glasses94":
									entity.setPropIndex(1, 10, 3, true);
									break;
								case "glasses95":
									entity.setPropIndex(1, 10, 4, true);
									break;
								case "glasses96":
									entity.setPropIndex(1, 10, 5, true);
									break;
								case "glasses97":
									entity.setPropIndex(1, 10, 6, true);
									break;
								case "glasses98":
									entity.setPropIndex(1, 10, 7, true);
									break;
								case "glasses99":
									entity.setPropIndex(1, 10, 8, true);
									break;
								case "glasses100":
									entity.setPropIndex(1, 10, 9, true);
									break;
								case "glasses101":
									entity.setPropIndex(1, 11, 0, true);
									break;
								case "glasses102":
									entity.setPropIndex(1, 11, 1, true);
									break;
								case "glasses103":
									entity.setPropIndex(1, 11, 2, true);
									break;
								case "glasses104":
									entity.setPropIndex(1, 11, 3, true);
									break;
								case "glasses105":
									entity.setPropIndex(1, 11, 4, true);
									break;
								case "glasses106":
									entity.setPropIndex(1, 11, 5, true);
									break;
								case "glasses107":
									entity.setPropIndex(1, 11, 6, true);
									break;
								case "glasses108":
									entity.setPropIndex(1, 11, 7, true);
									break;
								case "glasses109":
									entity.setPropIndex(1, 11, 8, true);
									break;
								case "glasses110":
									entity.setPropIndex(1, 11, 9, true);
									break;
								case "glasses111":
									entity.setPropIndex(1, 14, 0, true);
									break;
								case "glasses112":
									entity.setPropIndex(1, 14, 1, true);
									break;
								case "glasses113":
									entity.setPropIndex(1, 14, 2, true);
									break;
								case "glasses114":
									entity.setPropIndex(1, 14, 3, true);
									break;
								case "glasses115":
									entity.setPropIndex(1, 14, 4, true);
									break;
								case "glasses116":
									entity.setPropIndex(1, 14, 5, true);
									break;
								case "glasses117":
									entity.setPropIndex(1, 14, 6, true);
									break;
								case "glasses118":
									entity.setPropIndex(1, 14, 7, true);
									break;
								case "glasses119":
									entity.setPropIndex(1, 14, 8, true);
									break;
								case "glasses120":
									entity.setPropIndex(1, 14, 9, true);
									break;
								case "glasses121":
									entity.setPropIndex(1, 17, 0, true);
									break;
								case "glasses122":
									entity.setPropIndex(1, 17, 1, true);
									break;
								case "glasses123":
									entity.setPropIndex(1, 17, 2, true);
									break;
								case "glasses124":
									entity.setPropIndex(1, 17, 3, true);
									break;
								case "glasses125":
									entity.setPropIndex(1, 17, 4, true);
									break;
								case "glasses126":
									entity.setPropIndex(1, 17, 5, true);
									break;
								case "glasses127":
									entity.setPropIndex(1, 17, 6, true);
									break;
								case "glasses128":
									entity.setPropIndex(1, 17, 7, true);
									break;
								case "glasses129":
									entity.setPropIndex(1, 17, 8, true);
									break;
								case "glasses130":
									entity.setPropIndex(1, 17, 9, true);
									break;
								case "glasses131":
									entity.setPropIndex(1, 18, 0, true);
									break;
								case "glasses132":
									entity.setPropIndex(1, 18, 1, true);
									break;
								case "glasses133":
									entity.setPropIndex(1, 18, 2, true);
									break;
								case "glasses134":
									entity.setPropIndex(1, 18, 3, true);
									break;
								case "glasses135":
									entity.setPropIndex(1, 18, 4, true);
									break;
								case "glasses136":
									entity.setPropIndex(1, 18, 5, true);
									break;
								case "glasses137":
									entity.setPropIndex(1, 18, 6, true);
									break;
								case "glasses138":
									entity.setPropIndex(1, 18, 7, true);
									break;
								case "glasses139":
									entity.setPropIndex(1, 18, 8, true);
									break;
								case "glasses140":
									entity.setPropIndex(1, 18, 9, true);
									break;
								case "glasses141":
									entity.setPropIndex(1, 19, 0, true);
									break;
								case "glasses142":
									entity.setPropIndex(1, 19, 1, true);
									break;
								case "glasses143":
									entity.setPropIndex(1, 19, 2, true);
									break;
								case "glasses144":
									entity.setPropIndex(1, 19, 3, true);
									break;
								case "glasses145":
									entity.setPropIndex(1, 19, 4, true);
									break;
								case "glasses146":
									entity.setPropIndex(1, 19, 5, true);
									break;
								case "glasses147":
									entity.setPropIndex(1, 19, 6, true);
									break;
								case "glasses148":
									entity.setPropIndex(1, 19, 7, true);
									break;
								case "glasses149":
									entity.setPropIndex(1, 19, 8, true);
									break;
								case "glasses150":
									entity.setPropIndex(1, 19, 9, true);
									break;
								case "glasses151":
									entity.setPropIndex(1, 20, 0, true);
									break;
								case "glasses152":
									entity.setPropIndex(1, 20, 1, true);
									break;
								case "glasses153":
									entity.setPropIndex(1, 20, 2, true);
									break;
								case "glasses154":
									entity.setPropIndex(1, 20, 3, true);
									break;
								case "glasses155":
									entity.setPropIndex(1, 20, 4, true);
									break;
								case "glasses156":
									entity.setPropIndex(1, 20, 5, true);
									break;
								case "glasses157":
									entity.setPropIndex(1, 20, 6, true);
									break;
								case "glasses158":
									entity.setPropIndex(1, 20, 7, true);
									break;
							}
						}
					}else{
						entity.setPropIndex(1, -1, 0, true);
					}
					
					if(typeof(clothesData["watch"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							switch (clothesData["watch"].hash) {
								case "watch1":
									entity.setPropIndex(6, 0, 0, true);
									break;
							}
						}else{
							switch (clothesData["watch"].hash) {
								case "watch1":
									entity.setPropIndex(6, 2, 0, true);
									break;
							}
						}
					}else{
						entity.setPropIndex(6, -1, 0, true);
					}
					
					if(typeof(clothesData["bracelet"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							switch (clothesData["bracelet"].hash) {
								case "bracelet1":
									entity.setPropIndex(7, 0, 0, true);
									break;
							}
						}else{
							switch (clothesData["bracelet"].hash) {
								case "bracelet1":
									entity.setPropIndex(7, 2, 0, true);
									break;
							}
						}
					}else{
						entity.setPropIndex(7, -1, 0, true);
					}
					
					if(typeof(clothesData["tors"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							switch (clothesData["tors"].hash) {
								case "tors1":
									entity.setComponentVariation(3, 5, 0, 0);
									entity.setComponentVariation(11, 5, 1, 1);
									break;
								case "tors2":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 0, 0);
									break;
								case "tors3":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 1, 0);
									break;
								case "tors4":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 2, 0);
									break;
								case "tors5":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 3, 0);
									break;
								case "tors6":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 4, 0);
									break;
								case "tors7":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 5, 0);
									break;
								case "tors8":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 6, 0);
									break;
								case "tors9":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 7, 0);
									break;
								case "tors10":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 8, 0);
									break;
								case "tors11":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 11, 0);
									break;
								case "tors12":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 0, 0);
									break;
								case "tors13":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 1, 0);
									break;
								case "tors14":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 2, 0);
									break;
								case "tors15":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 3, 0);
									break;
								case "tors16":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 4, 0);
									break;
								case "tors17":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 5, 0);
									break;
								case "tors18":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 6, 0);
									break;
								case "tors19":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 7, 0);
									break;
								case "tors20":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 8, 0);
									break;
								case "tors21":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 11, 0);
									break;
								case "tors22":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 12, 0);
									break;
								case "tors23":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 1, 14, 0);
									break;
								case "tors24":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 0, 0);
									break;
								case "tors25":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 1, 0);
									break;
								case "tors26":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 2, 0);
									break;
								case "tors27":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 3, 0);
									break;
								case "tors28":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 4, 0);
									break;
								case "tors29":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 5, 0);
									break;
								case "tors30":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 6, 0);
									break;
								case "tors31":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 7, 0);
									break;
								case "tors32":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 8, 0);
									break;
								case "tors33":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 9, 0);
									break;
								case "tors34":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 10, 0);
									break;
								case "tors35":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 11, 0);
									break;
								case "tors36":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 12, 0);
									break;
								case "tors37":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 13, 0);
									break;
								case "tors38":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 14, 0);
									break;
								case "tors39":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 38, 0, 0);
									entity.setComponentVariation(11, 3, 15, 0);
									break;
								case "tors40":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 31, 0, 0);
									entity.setComponentVariation(11, 4, 0, 0);
									break;
								case "tors41":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 31, 0, 0);
									entity.setComponentVariation(11, 4, 2, 0);
									break;
								case "tors42":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 31, 0, 0);
									entity.setComponentVariation(11, 4, 3, 0);
									break;
								case "tors43":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 31, 0, 0);
									entity.setComponentVariation(11, 4, 11, 0);
									break;
								case "tors44":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 25, 4, 0);
									entity.setComponentVariation(11, 4, 14, 0);
									break;
								case "tors45":
									entity.setComponentVariation(3, 5, 0, 0);
									entity.setComponentVariation(11, 5, 0, 0);
									break;
								case "tors46":
									entity.setComponentVariation(3, 5, 0, 0);
									entity.setComponentVariation(11, 5, 1, 0);
									break;
								case "tors47":
									entity.setComponentVariation(3, 5, 0, 0);
									entity.setComponentVariation(11, 5, 2, 0);
									break;
								case "tors48":
									entity.setComponentVariation(3, 5, 0, 0);
									entity.setComponentVariation(11, 5, 7, 0);
									break;
								case "tors49":
									entity.setComponentVariation(3, 5, 0, 0);
									entity.setComponentVariation(11, 5, 7, 0);
									break;
								case "tors50":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 0, 0);
									break;
								case "tors51":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 1, 0);
									break;
								case "tors52":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 3, 0);
									break;
								case "tors53":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 4, 0);
									break;
								case "tors54":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 5, 0);
									break;
								case "tors55":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 6, 0);
									break;
								case "tors56":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 8, 0);
									break;
								case "tors57":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 9, 0);
									break;
								case "tors58":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 2, 0, 0);
									entity.setComponentVariation(11, 6, 11, 0);
									break;
								case "tors60":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 0, 0);
									break;
								case "tors61":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 1, 0);
									break;
								case "tors62":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 2, 0);
									break;
								case "tors63":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 3, 0);
									break;
								case "tors64":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 4, 0);
									break;
								case "tors65":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 5, 0);
									break;
								case "tors66":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 6, 0);
									break;
								case "tors67":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 7, 0);
									break;
								case "tors68":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 8, 0);
									break;
								case "tors69":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 9, 0);
									break;
								case "tors70":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 10, 0);
									break;
								case "tors71":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 11, 0);
									break;
								case "tors72":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 12, 0);
									break;
								case "tors73":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 13, 0);
									break;
								case "tors74":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 14, 0);
									break;
								case "tors75":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 1, 1, 0);
									entity.setComponentVariation(11, 7, 15, 0);
									break;
								case "tors76":
									entity.setComponentVariation(3, 8, 0, 0);
									entity.setComponentVariation(11, 8, 0, 0);
									break;
								case "tors77":
									entity.setComponentVariation(3, 8, 0, 0);
									entity.setComponentVariation(11, 8, 10, 0);
									break;
								case "tors78":
									entity.setComponentVariation(3, 8, 0, 0);
									entity.setComponentVariation(11, 8, 13, 0);
									break;
								case "tors79":
									entity.setComponentVariation(3, 8, 0, 0);
									entity.setComponentVariation(11, 8, 14, 0);
									break;
								case "tors80":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 0, 0);
									break;
								case "tors81":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 1, 0);
									break;
								case "tors82":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 2, 0);
									break;
								case "tors83":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 3, 0);
									break;
								case "tors84":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 4, 0);
									break;
								case "tors85":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 5, 0);
									break;
								case "tors86":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 6, 0);
									break;
								case "tors87":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 7, 0);
									break;
								case "tors88":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 10, 0);
									break;
								case "tors89":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 11, 0);
									break;
								case "tors90":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 12, 0);
									break;
								case "tors91":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 13, 0);
									break;
								case "tors92":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 14, 0);
									break;
								case "tors93":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 9, 15, 0);
									break;
								case "tors94":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 25, 6, 0);
									entity.setComponentVariation(11, 10, 0, 0);
									break;
								case "tors95":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 25, 6, 0);
									entity.setComponentVariation(11, 10, 1, 0);
									break;
								case "tors96":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(8, 25, 6, 0);
									entity.setComponentVariation(11, 10, 2, 0);
									break;
								case "tors97":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 18, 0, 0);
									break;
								case "tors98":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 18, 1, 0);
									break;
								case "tors99":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 18, 2, 0);
									break;
								case "tors100":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 18, 3, 0);
									break;
								case "tors101":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 51, 0, 0);
									break;
								case "tors102":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 51, 1, 0);
									break;
								case "tors103":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 51, 2, 0);
									break;
								case "tors104":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 116, 0, 0);
									break;
								case "tors105":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 194, 0, 0);
									break;
								case "tors106":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 194, 1, 0);
									break;
								case "tors107":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 194, 2, 0);
									break;
								case "tors108":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 0, 0);
									break;
								case "tors109":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 1, 0);
									break;
								case "tors110":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 2, 0);
									break;
								case "tors111":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 3, 0);
									break;
								case "tors112":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 4, 0);
									break;
								case "tors113":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 5, 0);
									break;
								case "tors114":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 6, 0);
									break;
								case "tors115":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 198, 7, 0);
									break;
								case "tors116":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 0, 0);
									break;
								case "tors117":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 1, 0);
									break;
								case "tors118":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 2, 0);
									break;
								case "tors119":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 3, 0);
									break;
								case "tors120":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 4, 0);
									break;
								case "tors121":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 5, 0);
									break;
								case "tors122":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 6, 0);
									break;
								case "tors123":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 199, 7, 0);
									break;
								case "tors124":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 330, 0, 0);
									break;
								case "tors125":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 0, 0);
									break;
								case "tors126":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 1, 0);
									break;
								case "tors127":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 2, 0);
									break;
								case "tors128":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 3, 0);
									break;
								case "tors129":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 4, 0);
									break;
								case "tors130":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 5, 0);
									break;
								case "tors131":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 6, 0);
									break;
								case "tors132":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 7, 0);
									break;
								case "tors133":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 8, 0);
									break;
								case "tors134":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 9, 0);
									break;
								case "tors135":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 10, 0);
									break;
								case "tors136":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 11, 0);
									break;
								case "tors137":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 12, 0);
									break;
								case "tors138":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 13, 0);
									break;
								case "tors139":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 14, 0);
									break;
								case "tors140":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 15, 0);
									break;
								case "tors141":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 16, 0);
									break;
								case "tors142":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 17, 0);
									break;
								case "tors143":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 18, 0);
									break;
								case "tors144":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 19, 0);
									break;
								case "tors145":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 20, 0);
									break;
								case "tors146":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 21, 0);
									break;
								case "tors147":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 22, 0);
									break;
								case "tors148":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 23, 0);
									break;
								case "tors149":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 24, 0);
									break;
								case "tors150":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 311, 25, 0);
									break;
								case "tors151":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 0, 0);
									break;
								case "tors152":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 1, 0);
									break;
								case "tors153":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 2, 0);
									break;
								case "tors154":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 3, 0);
									break;
								case "tors155":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 4, 0);
									break;
								case "tors156":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 5, 0);
									break;
								case "tors157":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 6, 0);
									break;
								case "tors158":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 7, 0);
									break;
								case "tors159":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 8, 0);
									break;
								case "tors160":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 9, 0);
									break;
								case "tors161":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 10, 0);
									break;
								case "tors162":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 11, 0);
									break;
								case "tors163":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 12, 0);
									break;
								case "tors164":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 13, 0);
									break;
								case "tors165":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 14, 0);
									break;
								case "tors166":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 15, 0);
									break;
								case "tors167":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 16, 0);
									break;
								case "tors168":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 17, 0);
									break;
								case "tors169":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 18, 0);
									break;
								case "tors170":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 19, 0);
									break;
								case "tors171":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 20, 0);
									break;
								case "tors172":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 21, 0);
									break;
								case "tors173":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 22, 0);
									break;
								case "tors174":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 23, 0);
									break;
								case "tors175":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 24, 0);
									break;
								case "tors176":
									entity.setComponentVariation(3, 12, 0, 0);
									entity.setComponentVariation(8, 33, 0, 0);
									entity.setComponentVariation(11, 292, 25, 0);
									break;
								case "tors177":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 0, 0);
									break;
								case "tors178":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 1, 0);
									break;
								case "tors179":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 2, 0);
									break;
								case "tors180":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 3, 0);
									break;
								case "tors181":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 4, 0);
									break;
								case "tors182":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 5, 0);
									break;
								case "tors183":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 6, 0);
									break;
								case "tors184":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 7, 0);
									break;
								case "tors185":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 8, 0);
									break;
								case "tors186":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 9, 0);
									break;
								case "tors187":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 10, 0);
									break;
								case "tors188":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 11, 0);
									break;
								case "tors189":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 12, 0);
									break;
								case "tors190":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 13, 0);
									break;
								case "tors191":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 14, 0);
									break;
								case "tors192":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 15, 0);
									break;
								case "tors193":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 16, 0);
									break;
								case "tors194":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 17, 0);
									break;
								case "tors195":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 18, 0);
									break;
								case "tors196":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 19, 0);
									break;
								case "tors197":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 20, 0);
									break;
								case "tors198":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 21, 0);
									break;
								case "tors199":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 22, 0);
									break;
								case "tors200":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 23, 0);
									break;
								case "tors201":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 24, 0);
									break;
								case "tors202":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 301, 25, 0);
									break;
								case "tors203":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 0, 0);
									break;
								case "tors204":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 1, 0);
									break;
								case "tors205":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 2, 0);
									break;
								case "tors206":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 3, 0);
									break;
								case "tors207":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 4, 0);
									break;
								case "tors208":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 5, 0);
									break;
								case "tors209":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 6, 0);
									break;
								case "tors210":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 7, 0);
									break;
								case "tors211":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 8, 0);
									break;
								case "tors212":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 9, 0);
									break;
								case "tors213":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 10, 0);
									break;
								case "tors214":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 11, 0);
									break;
								case "tors215":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 12, 0);
									break;
								case "tors216":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 13, 0);
									break;
								case "tors217":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 14, 0);
									break;
								case "tors218":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 15, 0);
									break;
								case "tors219":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 16, 0);
									break;
								case "tors220":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 17, 0);
									break;
								case "tors221":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 18, 0);
									break;
								case "tors222":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 19, 0);
									break;
								case "tors223":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 20, 0);
									break;
								case "tors224":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 21, 0);
									break;
								case "tors225":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 22, 0);
									break;
								case "tors226":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 23, 0);
									break;
								case "tors227":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 24, 0);
									break;
								case "tors228":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 296, 25, 0);
									break;
								case "tors229":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 0, 0);
									break;
								case "tors230":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 1, 0);
									break;
								case "tors231":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 2, 0);
									break;
								case "tors232":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 3, 0);
									break;
								case "tors233":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 4, 0);
									break;
								case "tors234":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 5, 0);
									break;
								case "tors235":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 6, 0);
									break;
								case "tors236":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 7, 0);
									break;
								case "tors237":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 8, 0);
									break;
								case "tors238":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 9, 0);
									break;
								case "tors239":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 10, 0);
									break;
								case "tors240":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 11, 0);
									break;
								case "tors241":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 12, 0);
									break;
								case "tors242":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 13, 0);
									break;
								case "tors243":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 14, 0);
									break;
								case "tors244":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 15, 0);
									break;
								case "tors245":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 16, 0);
									break;
								case "tors246":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 279, 17, 0);
									break;
								case "tors247":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 0, 0);
									break;
								case "tors248":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 1, 0);
									break;
								case "tors249":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 2, 0);
									break;
								case "tors250":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 3, 0);
									break;
								case "tors251":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 4, 0);
									break;
								case "tors252":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 5, 0);
									break;
								case "tors253":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 6, 0);
									break;
								case "tors254":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 7, 0);
									break;
								case "tors255":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 8, 0);
									break;
								case "tors256":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 9, 0);
									break;
								case "tors267":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 10, 0);
									break;
								case "tors258":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 11, 0);
									break;
								case "tors259":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 12, 0);
									break;
								case "tors260":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 13, 0);
									break;
								case "tors261":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 14, 0);
									break;
								case "tors262":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 9, 1, 0);
									entity.setComponentVariation(11, 261, 15, 0);
									break;
								case "tors263":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 0, 0);
									break;
								case "tors264":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 1, 0);
									break;
								case "tors265":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 2, 0);
									break;
								case "tors266":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 3, 0);
									break;
								case "tors267":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 4, 0);
									break;
								case "tors268":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 5, 0);
									break;
								case "tors269":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 6, 0);
									break;
								case "tors270":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 7, 0);
									break;
								case "tors271":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 8, 0);
									break;
								case "tors272":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 9, 0);
									break;
								case "tors273":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 10, 0);
									break;
								case "tors274":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 11, 0);
									break;
								case "tors275":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 12, 0);
									break;
								case "tors276":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 13, 0);
									break;
								case "tors277":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 14, 0);
									break;
								case "tors278":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 41, 2, 0);
									entity.setComponentVariation(11, 269, 15, 0);
									break;
								case "tors279":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 0, 0);
									break;
								case "tors280":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 1, 0);
									break;
								case "tors281":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 2, 0);
									break;
								case "tors282":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 3, 0);
									break;
								case "tors283":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 4, 0);
									break;
								case "tors284":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 5, 0);
									break;
								case "tors285":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 6, 0);
									break;
								case "tors286":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 7, 0);
									break;
								case "tors287":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 8, 0);
									break;
								case "tors288":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 9, 0);
									break;
								case "tors289":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 10, 0);
									break;
								case "tors290":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 11, 0);
									break;
								case "tors291":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 12, 0);
									break;
								case "tors292":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 13, 0);
									break;
								case "tors293":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 14, 0);
									break;
								case "tors294":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 15, 0);
									break;
								case "tors295":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 16, 0);
									break;
								case "tors296":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 17, 0);
									break;
								case "tors297":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 18, 0);
									break;
								case "tors298":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 19, 0);
									break;
								case "tors299":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 20, 0);
									break;
								case "tors300":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 21, 0);
									break;
								case "tors301":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 22, 0);
									break;
								case "tors302":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 23, 0);
									break;
								case "tors303":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 24, 0);
									break;
								case "tors304":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 251, 25, 0);
									break;
								case "tors305":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 362+maleTorsAdd, 0, 0);
									break;
								case "tors306":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 362+maleTorsAdd, 1, 0);
									break;
								case "tors307":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 363+maleTorsAdd, 0, 0);
									break;
								case "tors308":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 363+maleTorsAdd, 1, 0);
									break;
								case "tors309":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 364+maleTorsAdd, 0, 0);
									break;
								case "tors310":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 364+maleTorsAdd, 1, 0);
									break;
								case "tors311":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 364+maleTorsAdd, 2, 0);
									break;
								case "tors312":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 364+maleTorsAdd, 3, 0);
									break;
								case "tors313":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 364+maleTorsAdd, 4, 0);
									break;
								case "tors314":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 365+maleTorsAdd, 0, 0);
									break;
								case "tors315":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 365+maleTorsAdd, 1, 0);
									break;
								case "tors316":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 365+maleTorsAdd, 2, 0);
									break;
								case "tors317":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 366+maleTorsAdd, 0, 0);
									break;
								case "tors318":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 366+maleTorsAdd, 1, 0);
									break;
								case "tors319":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 366+maleTorsAdd, 2, 0);
									break;
								case "tors320":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 366+maleTorsAdd, 3, 0);
									break;
								case "tors321":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 367+maleTorsAdd, 0, 0);
									break;
								case "tors322":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 367+maleTorsAdd, 1, 0);
									break;
								case "tors323":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 367+maleTorsAdd, 2, 0);
									break;
								case "tors324":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 367+maleTorsAdd, 3, 0);
									break;
								case "tors325":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 367+maleTorsAdd, 4, 0);
									break;
								case "tors326":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 368+maleTorsAdd, 0, 0);
									break;
								case "tors327":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 368+maleTorsAdd, 1, 0);
									break;
								case "tors328":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 368+maleTorsAdd, 2, 0);
									break;
								case "tors329":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 368+maleTorsAdd, 3, 0);
									break;
								case "tors330":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 369+maleTorsAdd, 0, 0);
									break;
								case "tors331":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 370+maleTorsAdd, 0, 0);
									break;
								case "tors332":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 370+maleTorsAdd, 1, 0);
									break;
								case "tors333":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 370+maleTorsAdd, 2, 0);
									break;
								case "tors334":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 371+maleTorsAdd, 0, 0);
									break;
								case "tors335":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 371+maleTorsAdd, 1, 0);
									break;
								case "tors336":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 371+maleTorsAdd, 2, 0);
									break;
								case "tors337":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 371+maleTorsAdd, 3, 0);
									break;
								case "tors338":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 371+maleTorsAdd, 4, 0);
									break;
								case "tors339":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 371+maleTorsAdd, 5, 0);
									break;
								case "tors340":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 372+maleTorsAdd, 0, 0);
									break;
								case "tors341":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 372+maleTorsAdd, 1, 0);
									break;
								case "tors342":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 372+maleTorsAdd, 2, 0);
									break;
								case "tors343":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 372+maleTorsAdd, 3, 0);
									break;
								case "tors344":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 372+maleTorsAdd, 4, 0);
									break;
								case "tors345":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 373+maleTorsAdd, 0, 0);
									break;
								case "tors346":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 373+maleTorsAdd, 1, 0);
									break;
								case "tors347":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 373+maleTorsAdd, 2, 0);
									break;
								case "tors348":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 374+maleTorsAdd, 0, 0);
									break;
								case "tors349":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 374+maleTorsAdd, 1, 0);
									break;
								case "tors350":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 375+maleTorsAdd, 0, 0);
									break;
								case "tors351":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 375+maleTorsAdd, 1, 0);
									break;
								case "tors352":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 375+maleTorsAdd, 2, 0);
									break;
								case "tors353":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 375+maleTorsAdd, 3, 0);
									break;
								case "tors354":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 375+maleTorsAdd, 4, 0);
									break;
								case "tors355":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 376+maleTorsAdd, 0, 0);
									break;
								case "tors356":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 377+maleTorsAdd, 0, 0);
									break;
								case "tors357":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 378+maleTorsAdd, 0, 0);
									break;
								case "tors358":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 378+maleTorsAdd, 1, 0);
									break;
								case "tors359":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 379+maleTorsAdd, 0, 0);
									break;
								case "tors360":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 379+maleTorsAdd, 1, 0);
									break;
								case "tors361":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 380+maleTorsAdd, 0, 0);
									break;
								case "tors362":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 380+maleTorsAdd, 1, 0);
									break;
								case "tors363":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 380+maleTorsAdd, 2, 0);
									break;
								case "tors364":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 381+maleTorsAdd, 0, 0);
									break;
								case "tors365":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 381+maleTorsAdd, 1, 0);
									break;
								case "tors366":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 381+maleTorsAdd, 2, 0);
									break;
								case "tors367":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 381+maleTorsAdd, 3, 0);
									break;
								case "tors368":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 381+maleTorsAdd, 4, 0);
									break;
								case "tors369":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 382+maleTorsAdd, 0, 0);
									break;
								case "tors370":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 382+maleTorsAdd, 1, 0);
									break;
								case "tors371":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 382+maleTorsAdd, 2, 0);
									break;
								case "tors372":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 383+maleTorsAdd, 0, 0);
									break;
								case "tors373":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 383+maleTorsAdd, 1, 0);
									break;
								case "tors374":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 383+maleTorsAdd, 2, 0);
									break;
								case "tors375":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 383+maleTorsAdd, 3, 0);
									break;
								case "tors376":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 383+maleTorsAdd, 4, 0);
									break;
								case "tors377":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 383+maleTorsAdd, 5, 0);
									break;
								case "tors378":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 384+maleTorsAdd, 0, 0);
									break;
								case "tors379":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 384+maleTorsAdd, 1, 0);
									break;
								case "tors380":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 385+maleTorsAdd, 0, 0);
									break;
								case "tors381":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 385+maleTorsAdd, 1, 0);
									break;
								case "tors382":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 385+maleTorsAdd, 2, 0);
									break;
								case "tors383":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 385+maleTorsAdd, 3, 0);
									break;
								case "tors384":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 385+maleTorsAdd, 4, 0);
									break;
								case "tors385":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 385+maleTorsAdd, 5, 0);
									break;
								case "tors386":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 386+maleTorsAdd, 0, 0);
									break;
								case "tors387":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 386+maleTorsAdd, 1, 0);
									break;
								case "tors388":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 386+maleTorsAdd, 2, 0);
									break;
								case "tors389":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 387+maleTorsAdd, 0, 0);
									break;
								case "tors390":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 387+maleTorsAdd, 1, 0);
									break;
								case "tors391":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 387+maleTorsAdd, 2, 0);
									break;
								case "tors392":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 387+maleTorsAdd, 3, 0);
									break;
								case "tors393":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 387+maleTorsAdd, 4, 0);
									break;
								case "tors394":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 388+maleTorsAdd, 0, 0);
									break;
								case "tors395":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 388+maleTorsAdd, 1, 0);
									break;
								case "tors396":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 389+maleTorsAdd, 0, 0);
									break;
								case "tors397":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 390+maleTorsAdd, 0, 0);
									break;
								case "tors398":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 391+maleTorsAdd, 0, 0);
									break;
								case "tors399":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 391+maleTorsAdd, 1, 0);
									break;
								case "tors400":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 392+maleTorsAdd, 0, 0);
									break;
								case "tors401":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 392+maleTorsAdd, 1, 0);
									break;
								case "tors402":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 392+maleTorsAdd, 2, 0);
									break;
								case "tors403":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 392+maleTorsAdd, 3, 0);
									break;
								case "tors404":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 392+maleTorsAdd, 3, 0);
									break;
								case "tors405":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 0, 0);
									break;
								case "tors406":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 1, 0);
									break;
								case "tors407":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 2, 0);
									break;
								case "tors408":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 3, 0);
									break;
								case "tors409":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 4, 0);
									break;
								case "tors410":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 5, 0);
									break;
								case "tors411":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 6, 0);
									break;
								case "tors412":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 7, 0);
									break;
								case "tors413":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 393+maleTorsAdd, 8, 0);
									break;
								case "tors414":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 394+maleTorsAdd, 0, 0);
									break;
								case "tors415":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 394+maleTorsAdd, 1, 0);
									break;
								case "tors416":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 394+maleTorsAdd, 2, 0);
									break;
								case "tors417":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 394+maleTorsAdd, 3, 0);
									break;
								case "tors418":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 394+maleTorsAdd, 4, 0);
									break;
								case "tors419":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 0, 0);
									break;
								case "tors420":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 1, 0);
									break;
								case "tors421":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 2, 0);
									break;
								case "tors422":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 3, 0);
									break;
								case "tors423":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 4, 0);
									break;
								case "tors424":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 5, 0);
									break;
								case "tors425":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 6, 0);
									break;
								case "tors426":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 7, 0);
									break;
								case "tors427":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 395+maleTorsAdd, 8, 0);
									break;
								case "tors428":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 396+maleTorsAdd, 0, 0);
									break;
								case "tors429":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 396+maleTorsAdd, 1, 0);
									break;
								case "tors430":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 396+maleTorsAdd, 2, 0);
									break;
								case "tors431":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 396+maleTorsAdd, 3, 0);
									break;
								case "tors432":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 396+maleTorsAdd, 4, 0);
									break;
								case "tors433":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 397+maleTorsAdd, 0, 0);
									break;
								case "tors434":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 397+maleTorsAdd, 1, 0);
									break;
								case "tors435":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 398+maleTorsAdd, 0, 0);
									break;
								case "tors436":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 398+maleTorsAdd, 1, 0);
									break;
								case "tors437":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 398+maleTorsAdd, 2, 0);
									break;
								case "tors438":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 399+maleTorsAdd, 3, 0);
									break;
								case "tors439":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 399+maleTorsAdd, 0, 0);
									break;
								case "tors440":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 399+maleTorsAdd, 1, 0);
									break;
								case "tors441":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 399+maleTorsAdd, 2, 0);
									break;
								case "tors442":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 399+maleTorsAdd, 3, 0);
									break;
								case "tors443":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 400+maleTorsAdd, 0, 0);
									break;
								case "tors444":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 400+maleTorsAdd, 1, 0);
									break;
								case "tors445":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 400+maleTorsAdd, 2, 0);
									break;
								case "tors446":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 400+maleTorsAdd, 3, 0);
									break;
								case "tors447":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 400+maleTorsAdd, 4, 0);
									break;
								case "tors448":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 0, 0);
									break;
								case "tors449":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 1, 0);
									break;
								case "tors450":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 2, 0);
									break;
								case "tors451":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 3, 0);
									break;
								case "tors452":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 4, 0);
									break;
								case "tors453":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 5, 0);
									break;
								case "tors454":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 401+maleTorsAdd, 6, 0);
									break;
								case "tors455":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 0, 0);
									break;
								case "tors456":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 1, 0);
									break;
								case "tors457":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 2, 0);
									break;
								case "tors458":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 3, 0);
									break;
								case "tors459":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 4, 0);
									break;
								case "tors460":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 5, 0);
									break;
								case "tors461":
									entity.setComponentVariation(3, 11, 0, 0);
									entity.setComponentVariation(11, 402+maleTorsAdd, 6, 0);
									break;
								case "tors462":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 403+maleTorsAdd, 0, 0);
									break;
								case "tors463":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 13, 3, 0);
									entity.setComponentVariation(11, 404+maleTorsAdd, 0, 0);
									break;
								case "tors464":
									entity.setComponentVariation(3, 1, 0, 0);
									entity.setComponentVariation(11, 315, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.tors = true;
									break;
								case "tors465":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 25, 9, 0);
									entity.setComponentVariation(11, 405+maleTorsAdd, 0, 0);
									break;
								case "tors466":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 25, 9, 0);
									entity.setComponentVariation(11, 405+maleTorsAdd, 1, 0);
									break;
								case "tors467":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 25, 9, 0);
									entity.setComponentVariation(11, 405+maleTorsAdd, 2, 0);
									break;
								case "tors468":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 25, 3, 0);
									entity.setComponentVariation(11, 405+maleTorsAdd, 3, 0);
									break;
								case "tors469":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 33, 5, 0);
									entity.setComponentVariation(11, 406+maleTorsAdd, 0, 0);
									break;
								case "tors469":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 69, 0, 0);
									entity.setComponentVariation(11, 406+maleTorsAdd, 1, 0);
									break;
								case "tors470":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 106, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 0, 0);
									break;
								case "tors471":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 72, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 1, 0);
									break;
								case "tors472":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 176, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 2, 0);
									break;
								case "tors473":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 176, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 3, 0);
									break;
								case "tors474":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 176, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 4, 0);
									break;
								case "tors475":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 176, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 5, 0);
									break;
								case "tors476":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(8, 176, 0, 0);
									entity.setComponentVariation(11, 407+maleTorsAdd, 6, 0);
									break;
								case "tors477":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 408+maleTorsAdd, 0, 0);
									break;
								case "tors478":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 408+maleTorsAdd, 1, 0);
									break;
								case "tors479":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 408+maleTorsAdd, 2, 0);
									break;
							}
						}else{
							switch (clothesData["tors"].hash) {
								case "tors1":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 5, 1, 0);
									break;
								case "tors2":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 0, 0);
									break;
								case "tors3":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 1, 0);
									break;
								case "tors4":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 2, 0);
									break;
								case "tors5":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 3, 0);
									break;
								case "tors6":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 4, 0);
									break;
								case "tors7":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 5, 0);
									break;
								case "tors8":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 6, 0);
									break;
								case "tors9":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 7, 0);
									break;
								case "tors10":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 8, 0);
									break;
								case "tors11":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 9, 0);
									break;
								case "tors12":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 10, 0);
									break;
								case "tors13":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 11, 0);
									break;
								case "tors14":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 12, 0);
									break;
								case "tors15":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 13, 0);
									break;
								case "tors16":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 14, 0);
									break;
								case "tors17":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 0, 15, 0);
									break;
								case "tors18":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 27, 0, 0);
									break;
								case "tors19":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 27, 1, 0);
									break;
								case "tors20":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 27, 2, 0);
									break;
								case "tors21":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 27, 3, 0);
									break;
								case "tors22":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 27, 4, 0);
									break;
								case "tors23":
									entity.setComponentVariation(3, 0, 0, 0);
									entity.setComponentVariation(11, 27, 5, 0);
									break;
								case "tors24":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 36, 0, 0);
									break;
								case "tors25":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 36, 1, 0);
									break;
								case "tors26":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 36, 2, 0);
									break;
								case "tors27":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 36, 3, 0);
									break;
								case "tors28":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 36, 4, 0);
									break;
								case "tors29":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 50, 0, 0);
									break;
								case "tors30":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 56, 0, 0);
									break;
								case "tors31":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 0, 0);
									break;
								case "tors32":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 1, 0);
									break;
								case "tors33":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 2, 0);
									break;
								case "tors34":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 3, 0);
									break;
								case "tors35":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 4, 0);
									break;
								case "tors36":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 5, 0);
									break;
								case "tors37":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 16, 6, 0);
									break;
								case "tors38":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 102, 0, 0);
									break;
								case "tors39":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 103, 0, 0);
									break;
								case "tors40":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 103, 1, 0);
									break;
								case "tors41":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 103, 2, 0);
									break;
								case "tors42":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 103, 3, 0);
									break;
								case "tors43":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 103, 4, 0);
									break;
								case "tors44":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 103, 5, 0);
									break;
								case "tors45":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 169, 0, 0);
									break;
								case "tors46":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 169, 1, 0);
									break;
								case "tors47":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 169, 2, 0);
									break;
								case "tors48":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 169, 3, 0);
									break;
								case "tors49":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 169, 4, 0);
									break;
								case "tors50":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 169, 5, 0);
									break;
								case "tors51":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 0, 0);
									break;
								case "tors52":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 1, 0);
									break;
								case "tors53":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 2, 0);
									break;
								case "tors54":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 3, 0);
									break;
								case "tors55":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 4, 0);
									break;
								case "tors56":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 5, 0);
									break;
								case "tors57":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 6, 0);
									break;
								case "tors58":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 7, 0);
									break;
								case "tors59":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 8, 0);
									break;
								case "tors60":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 9, 0);
									break;
								case "tors61":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 10, 0);
									break;
								case "tors62":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 11, 0);
									break;
								case "tors63":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 12, 0);
									break;
								case "tors64":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 13, 0);
									break;
								case "tors65":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 14, 0);
									break;
								case "tors66":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 15, 0);
									break;
								case "tors67":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 16, 0);
									break;
								case "tors68":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 17, 0);
									break;
								case "tors69":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 18, 0);
									break;
								case "tors70":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 19, 0);
									break;
								case "tors71":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 20, 0);
									break;
								case "tors72":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 21, 0);
									break;
								case "tors73":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 22, 0);
									break;
								case "tors74":
									entity.setComponentVariation(3, 7, 0, 0);
									entity.setComponentVariation(11, 266, 23, 0);
									break;
								case "tors75":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 19, 0, 0);
									break;
								case "tors76":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 19, 1, 0);
									break;
								case "tors77":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 19, 2, 0);
									break;
								case "tors78":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 19, 3, 0);
									break;
								case "tors79":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 44, 0, 0);
									break;
								case "tors80":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 44, 1, 0);
									break;
								case "tors81":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 44, 2, 0);
									break;
								case "tors82":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 108, 0, 0);
									break;
								case "tors83":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 196, 0, 0);
									break;
								case "tors84":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 196, 1, 0);
									break;
								case "tors85":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 196, 2, 0);
									break;
								case "tors86":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 0, 0);
									break;
								case "tors87":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 1, 0);
									break;
								case "tors88":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 2, 0);
									break;
								case "tors89":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 3, 0);
									break;
								case "tors90":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 4, 0);
									break;
								case "tors91":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 5, 0);
									break;
								case "tors92":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 6, 0);
									break;
								case "tors93":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 200, 7, 0);
									break;
								case "tors94":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 0, 0);
									break;
								case "tors95":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 1, 0);
									break;
								case "tors96":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 2, 0);
									break;
								case "tors97":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 3, 0);
									break;
								case "tors98":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 4, 0);
									break;
								case "tors99":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 5, 0);
									break;
								case "tors100":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 6, 0);
									break;
								case "tors101":
									entity.setComponentVariation(3, 4, 0, 0);
									entity.setComponentVariation(11, 201, 7, 0);
									break;
								case "tors102":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 345, 0, 0);
									break;
								case "tors103":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 0, 0);
									break;
								case "tors104":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 1, 0);
									break;
								case "tors105":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 2, 0);
									break;
								case "tors106":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 3, 0);
									break;
								case "tors107":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 4, 0);
									break;
								case "tors108":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 5, 0);
									break;
								case "tors109":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 362, 6, 0);
									break;
								case "tors110":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 0, 0);
									break;
								case "tors111":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 1, 0);
									break;
								case "tors112":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 2, 0);
									break;
								case "tors113":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 3, 0);
									break;
								case "tors114":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 4, 0);
									break;
								case "tors115":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 5, 0);
									break;
								case "tors116":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 37, 0, 0);
									entity.setComponentVariation(11, 363, 6, 0);
									break;
								case "tors117":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 0, 0);
									break;
								case "tors118":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 1, 0);
									break;
								case "tors119":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 2, 0);
									break;
								case "tors120":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 3, 0);
									break;
								case "tors121":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 4, 0);
									break;
								case "tors122":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 5, 0);
									break;
								case "tors123":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 6, 0);
									break;
								case "tors124":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 7, 0);
									break;
								case "tors125":
									entity.setComponentVariation(3, 6, 0, 0);
									entity.setComponentVariation(11, 328, 8, 0);
									break;
								case "tors126":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 369, 0, 0);
									break;
								case "tors127":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 369, 1, 0);
									break;
								case "tors128":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 369, 2, 0);
									break;
								case "tors129":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 369, 3, 0);
									break;
								case "tors130":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 369, 4, 0);
									break;
								case "tors131":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 0, 0);
									break;
								case "tors132":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 1, 0);
									break;
								case "tors133":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 2, 0);
									break;
								case "tors134":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 3, 0);
									break;
								case "tors135":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 4, 0);
									break;
								case "tors136":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 5, 0);
									break;
								case "tors137":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 6, 0);
									break;
								case "tors138":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 7, 0);
									break;
								case "tors139":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 8, 0);
									break;
								case "tors140":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 9, 0);
									break;
								case "tors141":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 10, 0);
									break;
								case "tors142":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 11, 0);
									break;
								case "tors143":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 12, 0);
									break;
								case "tors144":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 13, 0);
									break;
								case "tors145":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 14, 0);
									break;
								case "tors146":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 15, 0);
									break;
								case "tors147":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 16, 0);
									break;
								case "tors148":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 17, 0);
									break;
								case "tors149":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 18, 0);
									break;
								case "tors150":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 366, 19, 0);
									break;
								case "tors151":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 0, 0);
									break;
								case "tors152":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 1, 0);
									break;
								case "tors153":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 2, 0);
									break;
								case "tors154":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 3, 0);
									break;
								case "tors155":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 4, 0);
									break;
								case "tors156":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 5, 0);
									break;
								case "tors157":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 381+femaleTorsAdd, 6, 0);
									break;
								case "tors158":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 0, 0);
									break;
								case "tors159":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 1, 0);
									break;
								case "tors160":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 2, 0);
									break;
								case "tors161":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 3, 0);
									break;
								case "tors162":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 4, 0);
									break;
								case "tors163":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 5, 0);
									break;
								case "tors164":
									entity.setComponentVariation(3, 14, 0, 0);
									entity.setComponentVariation(11, 382+femaleTorsAdd, 6, 0);
									break;
								case "tors165":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(11, 383+femaleTorsAdd, 0, 0);
									break;
								case "tors166":
									entity.setComponentVariation(3, 9, 0, 0);
									entity.setComponentVariation(8, 38, 3, 0);
									entity.setComponentVariation(11, 384+femaleTorsAdd, 0, 0);
									break;
								case "tors167":
									entity.setComponentVariation(3, 3, 0, 0);
									entity.setComponentVariation(11, 326, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.tors = true;
									break;
							}
						}
					}else{
						if(clothesData.npGender == "male") {
							entity.setComponentVariation(3, 15, 0, 0);
							entity.setComponentVariation(11, 15, 0, 0);
						}else{
							entity.setComponentVariation(3, 15, 0, 0);
							entity.setComponentVariation(11, 5, 0, 0);
						}
					}
					if(typeof(clothesData["pants"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							switch (clothesData["pants"].hash) {
								case "pants1":
									entity.setComponentVariation(4, 55, 1, 1);
									break;
								case "pants2":
									entity.setComponentVariation(4, 0, 1, 0);
									break;
								case "pants3":
									entity.setComponentVariation(4, 0, 2, 0);
									break;
								case "pants4":
									entity.setComponentVariation(4, 0, 3, 0);
									break;
								case "pants5":
									entity.setComponentVariation(4, 0, 4, 0);
									break;
								case "pants6":
									entity.setComponentVariation(4, 0, 5, 0);
									break;
								case "pants7":
									entity.setComponentVariation(4, 0, 6, 0);
									break;
								case "pants8":
									entity.setComponentVariation(4, 0, 7, 0);
									break;
								case "pants9":
									entity.setComponentVariation(4, 0, 8, 0);
									break;
								case "pants10":
									entity.setComponentVariation(4, 0, 9, 0);
									break;
								case "pants11":
									entity.setComponentVariation(4, 0, 10, 0);
									break;
								case "pants12":
									entity.setComponentVariation(4, 0, 11, 0);
									break;
								case "pants13":
									entity.setComponentVariation(4, 0, 12, 0);
									break;
								case "pants14":
									entity.setComponentVariation(4, 0, 13, 0);
									break;
								case "pants15":
									entity.setComponentVariation(4, 0, 14, 0);
									break;
								case "pants16":
									entity.setComponentVariation(4, 0, 15, 0);
									break;
								case "pants17":
									entity.setComponentVariation(4, 53, 0, 0);
									break;
								case "pants18":
									entity.setComponentVariation(4, 13, 0, 0);
									break;
								case "pants19":
									entity.setComponentVariation(4, 13, 1, 0);
									break;
								case "pants20":
									entity.setComponentVariation(4, 13, 2, 0);
									break;
								case "pants21":
									entity.setComponentVariation(4, 28, 0, 0);
									break;
								case "pants22":
									entity.setComponentVariation(4, 28, 1, 0);
									break;
								case "pants23":
									entity.setComponentVariation(4, 28, 2, 0);
									break;
								case "pants24":
									entity.setComponentVariation(4, 28, 3, 0);
									break;
								case "pants25":
									entity.setComponentVariation(4, 28, 4, 0);
									break;
								case "pants26":
									entity.setComponentVariation(4, 28, 5, 0);
									break;
								case "pants27":
									entity.setComponentVariation(4, 28, 6, 0);
									break;
								case "pants28":
									entity.setComponentVariation(4, 28, 7, 0);
									break;
								case "pants29":
									entity.setComponentVariation(4, 28, 8, 0);
									break;
								case "pants30":
									entity.setComponentVariation(4, 28, 9, 0);
									break;
								case "pants31":
									entity.setComponentVariation(4, 28, 10, 0);
									break;
								case "pants32":
									entity.setComponentVariation(4, 28, 11, 0);
									break;
								case "pants33":
									entity.setComponentVariation(4, 28, 12, 0);
									break;
								case "pants34":
									entity.setComponentVariation(4, 28, 13, 0);
									break;
								case "pants35":
									entity.setComponentVariation(4, 28, 14, 0);
									break;
								case "pants36":
									entity.setComponentVariation(4, 28, 15, 0);
									break;
								case "pants37":
									entity.setComponentVariation(4, 17, 0, 0);
									break;
								case "pants38":
									entity.setComponentVariation(4, 17, 1, 0);
									break;
								case "pants39":
									entity.setComponentVariation(4, 17, 2, 0);
									break;
								case "pants40":
									entity.setComponentVariation(4, 17, 3, 0);
									break;
								case "pants41":
									entity.setComponentVariation(4, 17, 4, 0);
									break;
								case "pants42":
									entity.setComponentVariation(4, 17, 5, 0);
									break;
								case "pants43":
									entity.setComponentVariation(4, 17, 6, 0);
									break;
								case "pants44":
									entity.setComponentVariation(4, 17, 7, 0);
									break;
								case "pants45":
									entity.setComponentVariation(4, 17, 8, 0);
									break;
								case "pants46":
									entity.setComponentVariation(4, 17, 9, 0);
									break;
								case "pants47":
									entity.setComponentVariation(4, 17, 10, 0);
									break;
								case "pants48":
									entity.setComponentVariation(4, 82, 0, 0);
									break;
								case "pants49":
									entity.setComponentVariation(4, 82, 1, 0);
									break;
								case "pants50":
									entity.setComponentVariation(4, 82, 2, 0);
									break;
								case "pants51":
									entity.setComponentVariation(4, 82, 3, 0);
									break;
								case "pants52":
									entity.setComponentVariation(4, 82, 4, 0);
									break;
								case "pants53":
									entity.setComponentVariation(4, 82, 5, 0);
									break;
								case "pants54":
									entity.setComponentVariation(4, 82, 6, 0);
									break;
								case "pants55":
									entity.setComponentVariation(4, 82, 7, 0);
									break;
								case "pants56":
									entity.setComponentVariation(4, 82, 8, 0);
									break;
								case "pants57":
									entity.setComponentVariation(4, 82, 9, 0);
									break;
								case "pants58":
									entity.setComponentVariation(4, 47, 0, 0);
									break;
								case "pants59":
									entity.setComponentVariation(4, 47, 1, 0);
									break;
								case "pants60":
									entity.setComponentVariation(4, 54, 0, 0);
									break;
								case "pants61":
									entity.setComponentVariation(4, 54, 1, 0);
									break;
								case "pants62":
									entity.setComponentVariation(4, 54, 2, 0);
									break;
								case "pants63":
									entity.setComponentVariation(4, 54, 3, 0);
									break;
								case "pants64":
									entity.setComponentVariation(4, 54, 4, 0);
									break;
								case "pants65":
									entity.setComponentVariation(4, 54, 5, 0);
									break;
								case "pants66":
									entity.setComponentVariation(4, 54, 6, 0);
									break;
								case "pants67":
									entity.setComponentVariation(4, 32, 0, 0);
									break;
								case "pants68":
									entity.setComponentVariation(4, 32, 1, 0);
									break;
								case "pants69":
									entity.setComponentVariation(4, 32, 2, 0);
									break;
								case "pants70":
									entity.setComponentVariation(4, 32, 3, 0);
									break;
								case "pants71":
									entity.setComponentVariation(4, 100, 0, 0);
									break;
								case "pants72":
									entity.setComponentVariation(4, 100, 1, 0);
									break;
								case "pants73":
									entity.setComponentVariation(4, 100, 2, 0);
									break;
								case "pants74":
									entity.setComponentVariation(4, 100, 3, 0);
									break;
								case "pants75":
									entity.setComponentVariation(4, 100, 4, 0);
									break;
								case "pants76":
									entity.setComponentVariation(4, 100, 5, 0);
									break;
								case "pants77":
									entity.setComponentVariation(4, 100, 6, 0);
									break;
								case "pants78":
									entity.setComponentVariation(4, 100, 7, 0);
									break;
								case "pants79":
									entity.setComponentVariation(4, 100, 8, 0);
									break;
								case "pants80":
									entity.setComponentVariation(4, 100, 9, 0);
									break;
								case "pants81":
									entity.setComponentVariation(4, 100, 10, 0);
									break;
								case "pants82":
									entity.setComponentVariation(4, 100, 11, 0);
									break;
								case "pants83":
									entity.setComponentVariation(4, 100, 12, 0);
									break;
								case "pants84":
									entity.setComponentVariation(4, 100, 13, 0);
									break;
								case "pants85":
									entity.setComponentVariation(4, 133+malePantsAdd, 0, 0);
									break;
								case "pants86":
									entity.setComponentVariation(4, 133+malePantsAdd, 1, 0);
									break;
								case "pants87":
									entity.setComponentVariation(4, 134+malePantsAdd, 0, 0);
									break;
								case "pants88":
									entity.setComponentVariation(4, 134+malePantsAdd, 1, 0);
									break;
								case "pants89":
									entity.setComponentVariation(4, 135+malePantsAdd, 0, 0);
									break;
								case "pants90":
									entity.setComponentVariation(4, 136+malePantsAdd, 0, 0);
									break;
								case "pants91":
									entity.setComponentVariation(4, 136+malePantsAdd, 1, 0);
									break;
								case "pants92":
									entity.setComponentVariation(4, 137+malePantsAdd, 0, 0);
									break;
								case "pants93":
									entity.setComponentVariation(4, 137+malePantsAdd, 1, 0);
									break;
								case "pants94":
									entity.setComponentVariation(4, 138+malePantsAdd, 0, 0);
									break;
								case "pants95":
									entity.setComponentVariation(4, 138+malePantsAdd, 1, 0);
									break;
								case "pants96":
									entity.setComponentVariation(4, 138+malePantsAdd, 2, 0);
									break;
								case "pants97":
									entity.setComponentVariation(4, 138+malePantsAdd, 3, 0);
									break;
								case "pants98":
									entity.setComponentVariation(4, 139+malePantsAdd, 0, 0);
									break;
								case "pants99":
									entity.setComponentVariation(4, 139+malePantsAdd, 1, 0);
									break;
								case "pants100":
									entity.setComponentVariation(4, 139+malePantsAdd, 2, 0);
									break;
								case "pants101":
									entity.setComponentVariation(4, 139+malePantsAdd, 3, 0);
									break;
								case "pants102":
									entity.setComponentVariation(4, 140+malePantsAdd, 0, 0);
									break;
								case "pants103":
									entity.setComponentVariation(4, 140+malePantsAdd, 1, 0);
									break;
								case "pants104":
									entity.setComponentVariation(4, 140+malePantsAdd, 2, 0);
									break;
								case "pants105":
									entity.setComponentVariation(4, 140+malePantsAdd, 3, 0);
									break;
								case "pants106":
									entity.setComponentVariation(4, 141+malePantsAdd, 0, 0);
									break;
								case "pants107":
									entity.setComponentVariation(4, 141+malePantsAdd, 1, 0);
									break;
								case "pants108":
									entity.setComponentVariation(4, 142+malePantsAdd, 0, 0);
									break;
								case "pants109":
									entity.setComponentVariation(4, 142+malePantsAdd, 1, 0);
									break;
								case "pants110":
									entity.setComponentVariation(4, 143+malePantsAdd, 0, 0);
									break;
								case "pants111":
									entity.setComponentVariation(4, 143+malePantsAdd, 1, 0);
									break;
								case "pants112":
									entity.setComponentVariation(4, 143+malePantsAdd, 2, 0);
									break;
								case "pants113":
									entity.setComponentVariation(4, 143+malePantsAdd, 3, 0);
									break;
								case "pants114":
									entity.setComponentVariation(4, 143+malePantsAdd, 4, 0);
									break;
								case "pants115":
									entity.setComponentVariation(4, 143+malePantsAdd, 5, 0);
									break;
								case "pants116":
									entity.setComponentVariation(4, 143+malePantsAdd, 6, 0);
									break;
								case "pants117":
									entity.setComponentVariation(4, 144+malePantsAdd, 0, 0);
									break;
								case "pants118":
									entity.setComponentVariation(4, 144+malePantsAdd, 1, 0);
									break;
								case "pants119":
									entity.setComponentVariation(4, 144+malePantsAdd, 2, 0);
									break;
								case "pants120":
									entity.setComponentVariation(4, 145+malePantsAdd, 0, 0);
									break;
								case "pants121":
									entity.setComponentVariation(4, 145+malePantsAdd, 1, 0);
									break;
								case "pants122":
									entity.setComponentVariation(4, 145+malePantsAdd, 2, 0);
									break;
								case "pants123":
									entity.setComponentVariation(4, 145+malePantsAdd, 3, 0);
									break;
								case "pants124":
									entity.setComponentVariation(4, 145+malePantsAdd, 4, 0);
									break;
								case "pants125":
									entity.setComponentVariation(4, 145+malePantsAdd, 5, 0);
									break;
								case "pants126":
									entity.setComponentVariation(4, 146+malePantsAdd, 0, 0);
									break;
								case "pants127":
									entity.setComponentVariation(4, 146+malePantsAdd, 1, 0);
									break;
								case "pants128":
									entity.setComponentVariation(4, 146+malePantsAdd, 2, 0);
									break;
								case "pants129":
									entity.setComponentVariation(4, 147+malePantsAdd, 0, 0);
									break;
								case "pants130":
									entity.setComponentVariation(4, 147+malePantsAdd, 1, 0);
									break;
								case "pants131":
									entity.setComponentVariation(4, 147+malePantsAdd, 2, 0);
									break;
								case "pants132":
									entity.setComponentVariation(4, 147+malePantsAdd, 3, 0);
									break;
								case "pants133":
									entity.setComponentVariation(4, 148+malePantsAdd, 0, 0);
									break;
								case "pants134":
									entity.setComponentVariation(4, 150+malePantsAdd, 0, 0);
									break;
								case "pants135":
									entity.setComponentVariation(4, 150+malePantsAdd, 1, 0);
									break;
								case "pants136":
									entity.setComponentVariation(4, 150+malePantsAdd, 2, 0);
									break;
								case "pants137":
									entity.setComponentVariation(4, 150+malePantsAdd, 3, 0);
									break;
								case "pants138":
									entity.setComponentVariation(4, 150+malePantsAdd, 4, 0);
									break;
								case "pants139":
									entity.setComponentVariation(4, 150+malePantsAdd, 5, 0);
									break;
								case "pants140":
									entity.setComponentVariation(4, 150+malePantsAdd, 6, 0);
									break;
								case "pants141":
									entity.setComponentVariation(4, 150+malePantsAdd, 7, 0);
									break;
								case "pants142":
									entity.setComponentVariation(4, 150+malePantsAdd, 8, 0);
									break;
								case "pants143":
									entity.setComponentVariation(4, 150+malePantsAdd, 9, 0);
									break;
								case "pants144":
									entity.setComponentVariation(4, 151+malePantsAdd, 0, 0);
									break;
								case "pants145":
									entity.setComponentVariation(4, 151+malePantsAdd, 1, 0);
									break;
								case "pants146":
									entity.setComponentVariation(4, 149+malePantsAdd, 0, 0);
									break;
								case "pants147":
									entity.setComponentVariation(4, 152+malePantsAdd, 0, 0);
									break;
								case "pants148":
									entity.setComponentVariation(4, 152+malePantsAdd, 1, 0);
									break;
								case "pants149":
									entity.setComponentVariation(4, 120, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.pants = true;
									break;
							}
						}else{
							switch (clothesData["pants"].hash) {
								case "pants1":
									entity.setComponentVariation(4, 30, 1, 1);
									break;
								case "pants2":
									entity.setComponentVariation(4, 4, 0, 0);
									break;
								case "pants3":
									entity.setComponentVariation(4, 4, 1, 0);
									break;
								case "pants4":
									entity.setComponentVariation(4, 4, 2, 0);
									break;
								case "pants5":
									entity.setComponentVariation(4, 4, 3, 0);
									break;
								case "pants6":
									entity.setComponentVariation(4, 4, 4, 0);
									break;
								case "pants7":
									entity.setComponentVariation(4, 4, 5, 0);
									break;
								case "pants8":
									entity.setComponentVariation(4, 4, 6, 0);
									break;
								case "pants9":
									entity.setComponentVariation(4, 4, 7, 0);
									break;
								case "pants10":
									entity.setComponentVariation(4, 4, 8, 0);
									break;
								case "pants11":
									entity.setComponentVariation(4, 4, 9, 0);
									break;
								case "pants12":
									entity.setComponentVariation(4, 4, 10, 0);
									break;
								case "pants13":
									entity.setComponentVariation(4, 4, 11, 0);
									break;
								case "pants14":
									entity.setComponentVariation(4, 4, 12, 0);
									break;
								case "pants15":
									entity.setComponentVariation(4, 4, 13, 0);
									break;
								case "pants16":
									entity.setComponentVariation(4, 4, 14, 0);
									break;
								case "pants17":
									entity.setComponentVariation(4, 4, 15, 0);
									break;
								case "pants18":
									entity.setComponentVariation(4, 23, 0, 0);
									break;
								case "pants19":
									entity.setComponentVariation(4, 23, 1, 0);
									break;
								case "pants20":
									entity.setComponentVariation(4, 23, 2, 0);
									break;
								case "pants21":
									entity.setComponentVariation(4, 23, 3, 0);
									break;
								case "pants22":
									entity.setComponentVariation(4, 23, 4, 0);
									break;
								case "pants23":
									entity.setComponentVariation(4, 23, 5, 0);
									break;
								case "pants24":
									entity.setComponentVariation(4, 23, 6, 0);
									break;
								case "pants25":
									entity.setComponentVariation(4, 23, 7, 0);
									break;
								case "pants26":
									entity.setComponentVariation(4, 23, 8, 0);
									break;
								case "pants27":
									entity.setComponentVariation(4, 23, 9, 0);
									break;
								case "pants28":
									entity.setComponentVariation(4, 23, 10, 0);
									break;
								case "pants29":
									entity.setComponentVariation(4, 23, 11, 0);
									break;
								case "pants30":
									entity.setComponentVariation(4, 23, 12, 0);
									break;
								case "pants31":
									entity.setComponentVariation(4, 28, 0, 0);
									break;
								case "pants32":
									entity.setComponentVariation(4, 112, 0, 0);
									break;
								case "pants33":
									entity.setComponentVariation(4, 112, 1, 0);
									break;
								case "pants34":
									entity.setComponentVariation(4, 112, 2, 0);
									break;
								case "pants35":
									entity.setComponentVariation(4, 112, 3, 0);
									break;
								case "pants36":
									entity.setComponentVariation(4, 112, 4, 0);
									break;
								case "pants37":
									entity.setComponentVariation(4, 112, 5, 0);
									break;
								case "pants38":
									entity.setComponentVariation(4, 112, 6, 0);
									break;
								case "pants39":
									entity.setComponentVariation(4, 112, 7, 0);
									break;
								case "pants40":
									entity.setComponentVariation(4, 112, 8, 0);
									break;
								case "pants41":
									entity.setComponentVariation(4, 112, 9, 0);
									break;
								case "pants42":
									entity.setComponentVariation(4, 112, 10, 0);
									break;
								case "pants43":
									entity.setComponentVariation(4, 112, 11, 0);
									break;
								case "pants44":
									entity.setComponentVariation(4, 43, 0, 0);
									break;
								case "pants45":
									entity.setComponentVariation(4, 43, 1, 0);
									break;
								case "pants46":
									entity.setComponentVariation(4, 43, 2, 0);
									break;
								case "pants47":
									entity.setComponentVariation(4, 43, 3, 0);
									break;
								case "pants48":
									entity.setComponentVariation(4, 43, 4, 0);
									break;
								case "pants49":
									entity.setComponentVariation(4, 64, 0, 0);
									break;
								case "pants50":
									entity.setComponentVariation(4, 64, 1, 0);
									break;
								case "pants51":
									entity.setComponentVariation(4, 64, 2, 0);
									break;
								case "pants52":
									entity.setComponentVariation(4, 64, 3, 0);
									break;
								case "pants53":
									entity.setComponentVariation(4, 140+femalePantsAdd, 0, 0);
									break;
								case "pants54":
									entity.setComponentVariation(4, 140+femalePantsAdd, 1, 0);
									break;
								case "pants55":
									entity.setComponentVariation(4, 126, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.pants = true;
									break;
							}
						}
					}else{
						if(clothesData.npGender == "male") entity.setComponentVariation(4, 21, 0, 0);
						else entity.setComponentVariation(4, 19, 0, 0);
					}
					if(typeof(clothesData["shoes"]) !== "undefined") {
						if(clothesData.npGender == "male") {
							//console.log(clothesData["shoes"].hash);
							switch(clothesData["shoes"].hash) {
								case "shoes1":
									entity.setComponentVariation(6, 1, 1, 0);
									break;
								case "shoes2":
									entity.setComponentVariation(6, 1, 0, 0);
									break;
								case "shoes3":
									entity.setComponentVariation(6, 1, 2, 0);
									break;
								case "shoes4":
									entity.setComponentVariation(6, 1, 3, 0);
									break;
								case "shoes5":
									entity.setComponentVariation(6, 1, 4, 0);
									break;
								case "shoes6":
									entity.setComponentVariation(6, 1, 5, 0);
									break;
								case "shoes7":
									entity.setComponentVariation(6, 1, 6, 0);
									break;
								case "shoes8":
									entity.setComponentVariation(6, 1, 7, 0);
									break;
								case "shoes9":
									entity.setComponentVariation(6, 1, 8, 0);
									break;
								case "shoes10":
									entity.setComponentVariation(6, 1, 10, 0);
									break;
								case "shoes11":
									entity.setComponentVariation(6, 1, 11, 0);
									break;
								case "shoes12":
									entity.setComponentVariation(6, 1, 12, 0);
									break;
								case "shoes13":
									entity.setComponentVariation(6, 1, 13, 0);
									break;
								case "shoes14":
									entity.setComponentVariation(6, 1, 14, 0);
									break;
								case "shoes15":
									entity.setComponentVariation(6, 1, 15, 0);
									break;
								case "shoes16":
									entity.setComponentVariation(6, 3, 0, 0);
									break;
								case "shoes17":
									entity.setComponentVariation(6, 3, 1, 0);
									break;
								case "shoes18":
									entity.setComponentVariation(6, 3, 2, 0);
									break;
								case "shoes19":
									entity.setComponentVariation(6, 3, 3, 0);
									break;
								case "shoes20":
									entity.setComponentVariation(6, 3, 4, 0);
									break;
								case "shoes21":
									entity.setComponentVariation(6, 3, 5, 0);
									break;
								case "shoes22":
									entity.setComponentVariation(6, 3, 6, 0);
									break;
								case "shoes23":
									entity.setComponentVariation(6, 3, 7, 0);
									break;
								case "shoes24":
									entity.setComponentVariation(6, 3, 8, 0);
									break;
								case "shoes25":
									entity.setComponentVariation(6, 3, 9, 0);
									break;
								case "shoes26":
									entity.setComponentVariation(6, 3, 10, 0);
									break;
								case "shoes27":
									entity.setComponentVariation(6, 3, 11, 0);
									break;
								case "shoes28":
									entity.setComponentVariation(6, 3, 12, 0);
									break;
								case "shoes29":
									entity.setComponentVariation(6, 3, 13, 0);
									break;
								case "shoes30":
									entity.setComponentVariation(6, 3, 14, 0);
									break;
								case "shoes31":
									entity.setComponentVariation(6, 3, 15, 0);
									break;
								case "shoes32":
									entity.setComponentVariation(6, 4, 0, 0);
									break;
								case "shoes33":
									entity.setComponentVariation(6, 4, 1, 0);
									break;
								case "shoes34":
									entity.setComponentVariation(6, 4, 2, 0);
									break;
								case "shoes35":
									entity.setComponentVariation(6, 4, 4, 0);
									break;
								case "shoes36":
									entity.setComponentVariation(6, 5, 0, 0);
									break;
								case "shoes37":
									entity.setComponentVariation(6, 5, 1, 0);
									break;
								case "shoes38":
									entity.setComponentVariation(6, 5, 2, 0);
									break;
								case "shoes39":
									entity.setComponentVariation(6, 5, 3, 0);
									break;
								case "shoes40":
									entity.setComponentVariation(6, 6, 0, 0);
									break;
								case "shoes41":
									entity.setComponentVariation(6, 6, 1, 0);
									break;
								case "shoes42":
									entity.setComponentVariation(6, 7, 0, 0);
									break;
								case "shoes43":
									entity.setComponentVariation(6, 7, 1, 0);
									break;
								case "shoes44":
									entity.setComponentVariation(6, 7, 2, 0);
									break;
								case "shoes45":
									entity.setComponentVariation(6, 7, 3, 0);
									break;
								case "shoes46":
									entity.setComponentVariation(6, 7, 4, 0);
									break;
								case "shoes47":
									entity.setComponentVariation(6, 7, 5, 0);
									break;
								case "shoes48":
									entity.setComponentVariation(6, 7, 6, 0);
									break;
								case "shoes49":
									entity.setComponentVariation(6, 7, 7, 0);
									break;
								case "shoes50":
									entity.setComponentVariation(6, 7, 8, 0);
									break;
								case "shoes51":
									entity.setComponentVariation(6, 7, 9, 0);
									break;
								case "shoes52":
									entity.setComponentVariation(6, 7, 10, 0);
									break;
								case "shoes53":
									entity.setComponentVariation(6, 7, 11, 0);
									break;
								case "shoes54":
									entity.setComponentVariation(6, 7, 12, 0);
									break;
								case "shoes55":
									entity.setComponentVariation(6, 7, 13, 0);
									break;
								case "shoes56":
									entity.setComponentVariation(6, 7, 14, 0);
									break;
								case "shoes57":
									entity.setComponentVariation(6, 7, 15, 0);
									break;
								case "shoes58":
									entity.setComponentVariation(6, 12, 0, 0);
									break;
								case "shoes59":
									entity.setComponentVariation(6, 12, 1, 0);
									break;
								case "shoes60":
									entity.setComponentVariation(6, 12, 2, 0);
									break;
								case "shoes61":
									entity.setComponentVariation(6, 12, 3, 0);
									break;
								case "shoes62":
									entity.setComponentVariation(6, 12, 4, 0);
									break;
								case "shoes63":
									entity.setComponentVariation(6, 12, 5, 0);
									break;
								case "shoes64":
									entity.setComponentVariation(6, 12, 6, 0);
									break;
								case "shoes65":
									entity.setComponentVariation(6, 12, 7, 0);
									break;
								case "shoes66":
									entity.setComponentVariation(6, 12, 8, 0);
									break;
								case "shoes67":
									entity.setComponentVariation(6, 12, 9, 0);
									break;
								case "shoes68":
									entity.setComponentVariation(6, 12, 10, 0);
									break;
								case "shoes69":
									entity.setComponentVariation(6, 12, 11, 0);
									break;
								case "shoes70":
									entity.setComponentVariation(6, 12, 12, 0);
									break;
								case "shoes71":
									entity.setComponentVariation(6, 12, 13, 0);
									break;
								case "shoes72":
									entity.setComponentVariation(6, 12, 14, 0);
									break;
								case "shoes73":
									entity.setComponentVariation(6, 12, 15, 0);
									break;
								case "shoes74":
									entity.setComponentVariation(6, 21, 0, 0);
									break;
								case "shoes75":
									entity.setComponentVariation(6, 21, 1, 0);
									break;
								case "shoes76":
									entity.setComponentVariation(6, 21, 2, 0);
									break;
								case "shoes77":
									entity.setComponentVariation(6, 21, 3, 0);
									break;
								case "shoes78":
									entity.setComponentVariation(6, 21, 4, 0);
									break;
								case "shoes79":
									entity.setComponentVariation(6, 21, 5, 0);
									break;
								case "shoes80":
									entity.setComponentVariation(6, 21, 6, 0);
									break;
								case "shoes81":
									entity.setComponentVariation(6, 21, 7, 0);
									break;
								case "shoes82":
									entity.setComponentVariation(6, 21, 8, 0);
									break;
								case "shoes83":
									entity.setComponentVariation(6, 21, 9, 0);
									break;
								case "shoes84":
									entity.setComponentVariation(6, 21, 10, 0);
									break;
								case "shoes85":
									entity.setComponentVariation(6, 21, 11, 0);
									break;
								case "shoes86":
									entity.setComponentVariation(6, 23, 0, 0);
									break;
								case "shoes87":
									entity.setComponentVariation(6, 23, 1, 0);
									break;
								case "shoes88":
									entity.setComponentVariation(6, 23, 2, 0);
									break;
								case "shoes89":
									entity.setComponentVariation(6, 23, 3, 0);
									break;
								case "shoes90":
									entity.setComponentVariation(6, 23, 4, 0);
									break;
								case "shoes91":
									entity.setComponentVariation(6, 23, 5, 0);
									break;
								case "shoes92":
									entity.setComponentVariation(6, 23, 6, 0);
									break;
								case "shoes93":
									entity.setComponentVariation(6, 23, 7, 0);
									break;
								case "shoes94":
									entity.setComponentVariation(6, 23, 8, 0);
									break;
								case "shoes95":
									entity.setComponentVariation(6, 23, 9, 0);
									break;
								case "shoes96":
									entity.setComponentVariation(6, 23, 10, 0);
									break;
								case "shoes97":
									entity.setComponentVariation(6, 23, 11, 0);
									break;
								case "shoes98":
									entity.setComponentVariation(6, 23, 12, 0);
									break;
								case "shoes99":
									entity.setComponentVariation(6, 23, 13, 0);
									break;
								case "shoes100":
									entity.setComponentVariation(6, 23, 14, 0);
									break;
								case "shoes101":
									entity.setComponentVariation(6, 23, 15, 0);
									break;
								case "shoes102":
									entity.setComponentVariation(6, 31, 0, 0);
									break;
								case "shoes103":
									entity.setComponentVariation(6, 31, 1, 0);
									break;
								case "shoes104":
									entity.setComponentVariation(6, 31, 2, 0);
									break;
								case "shoes105":
									entity.setComponentVariation(6, 31, 3, 0);
									break;
								case "shoes106":
									entity.setComponentVariation(6, 31, 4, 0);
									break;
								case "shoes107":
									entity.setComponentVariation(6, 55, 0, 0);
									break;
								case "shoes108":
									entity.setComponentVariation(6, 55, 1, 0);
									break;
								case "shoes109":
									entity.setComponentVariation(6, 55, 2, 0);
									break;
								case "shoes110":
									entity.setComponentVariation(6, 55, 3, 0);
									break;
								case "shoes111":
									entity.setComponentVariation(6, 55, 4, 0);
									break;
								case "shoes112":
									entity.setComponentVariation(6, 55, 5, 0);
									break;
								case "shoes113":
									entity.setComponentVariation(6, 55, 6, 0);
									break;
								case "shoes114":
									entity.setComponentVariation(6, 55, 7, 0);
									break;
								case "shoes115":
									entity.setComponentVariation(6, 55, 8, 0);
									break;
								case "shoes116":
									entity.setComponentVariation(6, 55, 9, 0);
									break;
								case "shoes117":
									entity.setComponentVariation(6, 93, 0, 0);
									break;
								case "shoes118":
									entity.setComponentVariation(6, 93, 1, 0);
									break;
								case "shoes119":
									entity.setComponentVariation(6, 93, 2, 0);
									break;
								case "shoes120":
									entity.setComponentVariation(6, 93, 3, 0);
									break;
								case "shoes121":
									entity.setComponentVariation(6, 93, 4, 0);
									break;
								case "shoes122":
									entity.setComponentVariation(6, 93, 5, 0);
									break;
								case "shoes123":
									entity.setComponentVariation(6, 93, 6, 0);
									break;
								case "shoes124":
									entity.setComponentVariation(6, 93, 7, 0);
									break;
								case "shoes125":
									entity.setComponentVariation(6, 93, 8, 0);
									break;
								case "shoes126":
									entity.setComponentVariation(6, 93, 9, 0);
									break;
								case "shoes127":
									entity.setComponentVariation(6, 93, 10, 0);
									break;
								case "shoes128":
									entity.setComponentVariation(6, 93, 12, 0);
									break;
								case "shoes129":
									entity.setComponentVariation(6, 93, 13, 0);
									break;
								case "shoes130":
									entity.setComponentVariation(6, 93, 14, 0);
									break;
								case "shoes131":
									entity.setComponentVariation(6, 77, 0, 0);
									break;
								case "shoes132":
									entity.setComponentVariation(6, 77, 1, 0);
									break;
								case "shoes133":
									entity.setComponentVariation(6, 77, 2, 0);
									break;
								case "shoes134":
									entity.setComponentVariation(6, 77, 3, 0);
									break;
								case "shoes135":
									entity.setComponentVariation(6, 77, 4, 0);
									break;
								case "shoes136":
									entity.setComponentVariation(6, 77, 5, 0);
									break;
								case "shoes137":
									entity.setComponentVariation(6, 77, 6, 0);
									break;
								case "shoes138":
									entity.setComponentVariation(6, 77, 7, 0);
									break;
								case "shoes139":
									entity.setComponentVariation(6, 77, 8, 0);
									break;
								case "shoes140":
									entity.setComponentVariation(6, 77, 9, 0);
									break;
								case "shoes141":
									entity.setComponentVariation(6, 77, 10, 0);
									break;
								case "shoes142":
									entity.setComponentVariation(6, 77, 11, 0);
									break;
								case "shoes143":
									entity.setComponentVariation(6, 77, 12, 0);
									break;
								case "shoes144":
									entity.setComponentVariation(6, 77, 13, 0);
									break;
								case "shoes145":
									entity.setComponentVariation(6, 77, 14, 0);
									break;
								case "shoes146":
									entity.setComponentVariation(6, 77, 15, 0);
									break;
								case "shoes147":
									entity.setComponentVariation(6, 77, 16, 0);
									break;
								case "shoes148":
									entity.setComponentVariation(6, 77, 17, 0);
									break;
								case "shoes149":
									entity.setComponentVariation(6, 77, 18, 0);
									break;
								case "shoes150":
									entity.setComponentVariation(6, 77, 19, 0);
									break;
								case "shoes151":
									entity.setComponentVariation(6, 77, 20, 0);
									break;
								case "shoes152":
									entity.setComponentVariation(6, 77, 21, 0);
									break;
								case "shoes153":
									entity.setComponentVariation(6, 77, 22, 0);
									break;
								case "shoes154":
									entity.setComponentVariation(6, 77, 23, 0);
									break;
								case "shoes155":
									entity.setComponentVariation(6, 77, 24, 0);
									break;
								case "shoes156":
									entity.setComponentVariation(6, 77, 25, 0);
									break;
								case "shoes157":
									entity.setComponentVariation(6, 98+maleShoesAdd, 0, 0);
									break;
								case "shoes158":
									entity.setComponentVariation(6, 98+maleShoesAdd, 1, 0);
									break;
								case "shoes159":
									entity.setComponentVariation(6, 98+maleShoesAdd, 2, 0);
									break;
								case "shoes160":
									entity.setComponentVariation(6, 98+maleShoesAdd, 3, 0);
									break;
								case "shoes161":
									entity.setComponentVariation(6, 98+maleShoesAdd, 4, 0);
									break;
								case "shoes162":
									entity.setComponentVariation(6, 99+maleShoesAdd, 0, 0);
									break;
								case "shoes163":
									entity.setComponentVariation(6, 99+maleShoesAdd, 1, 0);
									break;
								case "shoes164":
									entity.setComponentVariation(6, 99+maleShoesAdd, 2, 0);
									break;
								case "shoes165":
									entity.setComponentVariation(6, 99+maleShoesAdd, 3, 0);
									break;
								case "shoes166":
									entity.setComponentVariation(6, 100+maleShoesAdd, 0, 0);
									break;
								case "shoes167":
									entity.setComponentVariation(6, 100+maleShoesAdd, 1, 0);
									break;
								case "shoes168":
									entity.setComponentVariation(6, 100+maleShoesAdd, 2, 0);
									break;
								case "shoes169":
									entity.setComponentVariation(6, 100+maleShoesAdd, 3, 0);
									break;
								case "shoes170":
									entity.setComponentVariation(6, 100+maleShoesAdd, 4, 0);
									break;
								case "shoes171":
									entity.setComponentVariation(6, 100+maleShoesAdd, 5, 0);
									break;
								case "shoes172":
									entity.setComponentVariation(6, 100+maleShoesAdd, 6, 0);
									break;
								case "shoes173":
									entity.setComponentVariation(6, 100+maleShoesAdd, 7, 0);
									break;
								case "shoes174":
									entity.setComponentVariation(6, 100+maleShoesAdd, 8, 0);
									break;
								case "shoes175":
									entity.setComponentVariation(6, 100+maleShoesAdd, 9, 0);
									break;
								case "shoes176":
									entity.setComponentVariation(6, 101+maleShoesAdd, 0, 0);
									break;
								case "shoes177":
									entity.setComponentVariation(6, 101+maleShoesAdd, 1, 0);
									break;
								case "shoes178":
									entity.setComponentVariation(6, 101+maleShoesAdd, 2, 0);
									break;
								case "shoes179":
									entity.setComponentVariation(6, 101+maleShoesAdd, 3, 0);
									break;
								case "shoes180":
									entity.setComponentVariation(6, 102+maleShoesAdd, 0, 0);
									break;
								case "shoes181":
									entity.setComponentVariation(6, 102+maleShoesAdd, 1, 0);
									break;
								case "shoes182":
									entity.setComponentVariation(6, 102+maleShoesAdd, 2, 0);
									break;
								case "shoes183":
									entity.setComponentVariation(6, 102+maleShoesAdd, 3, 0);
									break;
								case "shoes184":
									entity.setComponentVariation(6, 102+maleShoesAdd, 4, 0);
									break;
								case "shoes185":
									entity.setComponentVariation(6, 103+maleShoesAdd, 0, 0);
									break;
								case "shoes186":
									entity.setComponentVariation(6, 103+maleShoesAdd, 1, 0);
									break;
								case "shoes187":
									entity.setComponentVariation(6, 103+maleShoesAdd, 2, 0);
									break;
								case "shoes188":
									entity.setComponentVariation(6, 103+maleShoesAdd, 3, 0);
									break;
								case "shoes189":
									entity.setComponentVariation(6, 103+maleShoesAdd, 4, 0);
									break;
								case "shoes190":
									entity.setComponentVariation(6, 104+maleShoesAdd, 0, 0);
									break;
								case "shoes191":
									entity.setComponentVariation(6, 104+maleShoesAdd, 1, 0);
									break;
								case "shoes192":
									entity.setComponentVariation(6, 104+maleShoesAdd, 2, 0);
									break;
								case "shoes193":
									entity.setComponentVariation(6, 104+maleShoesAdd, 3, 0);
									break;
								case "shoes194":
									entity.setComponentVariation(6, 104+maleShoesAdd, 4, 0);
									break;
								case "shoes195":
									entity.setComponentVariation(6, 104+maleShoesAdd, 5, 0);
									break;
								case "shoes196":
									entity.setComponentVariation(6, 104+maleShoesAdd, 6, 0);
									break;
								case "shoes197":
									entity.setComponentVariation(6, 105+maleShoesAdd, 0, 0);
									break;
								case "shoes198":
									entity.setComponentVariation(6, 105+maleShoesAdd, 1, 0);
									break;
								case "shoes199":
									entity.setComponentVariation(6, 105+maleShoesAdd, 2, 0);
									break;
								case "shoes200":
									entity.setComponentVariation(6, 106+maleShoesAdd, 0, 0);
									break;
								case "shoes201":
									entity.setComponentVariation(6, 106+maleShoesAdd, 1, 0);
									break;
								case "shoes202":
									entity.setComponentVariation(6, 106+maleShoesAdd, 2, 0);
									break;
								case "shoes203":
									entity.setComponentVariation(6, 106+maleShoesAdd, 3, 0);
									break;
								case "shoes204":
									entity.setComponentVariation(6, 107+maleShoesAdd, 0, 0);
									break;
								case "shoes205":
									entity.setComponentVariation(6, 107+maleShoesAdd, 1, 0);
									break;
								case "shoes206":
									entity.setComponentVariation(6, 107+maleShoesAdd, 2, 0);
									break;
								case "shoes207":
									entity.setComponentVariation(6, 107+maleShoesAdd, 3, 0);
									break;
								case "shoes208":
									entity.setComponentVariation(6, 107+maleShoesAdd, 4, 0);
									break;
								case "shoes209":
									entity.setComponentVariation(6, 107+maleShoesAdd, 5, 0);
									break;
								case "shoes210":
									entity.setComponentVariation(6, 107+maleShoesAdd, 6, 0);
									break;
								case "shoes211":
									entity.setComponentVariation(6, 107+maleShoesAdd, 7, 0);
									break;
								case "shoes212":
									entity.setComponentVariation(6, 108+maleShoesAdd, 0, 0);
									break;
								case "shoes213":
									entity.setComponentVariation(6, 108+maleShoesAdd, 1, 0);
									break;
								case "shoes214":
									entity.setComponentVariation(6, 108+maleShoesAdd, 2, 0);
									break;
								case "shoes215":
									entity.setComponentVariation(6, 108+maleShoesAdd, 3, 0);
									break;
								case "shoes216":
									entity.setComponentVariation(6, 108+maleShoesAdd, 4, 0);
									break;
								case "shoes217":
									entity.setComponentVariation(6, 108+maleShoesAdd, 5, 0);
									break;
								case "shoes218":
									entity.setComponentVariation(6, 109+maleShoesAdd, 0, 0);
									break;
								case "shoes219":
									entity.setComponentVariation(6, 109+maleShoesAdd, 1, 0);
									break;
								case "shoes220":
									entity.setComponentVariation(6, 109+maleShoesAdd, 2, 0);
									break;
								case "shoes221":
									entity.setComponentVariation(6, 109+maleShoesAdd, 3, 0);
									break;
								case "shoes222":
									entity.setComponentVariation(6, 109+maleShoesAdd, 4, 0);
									break;
								case "shoes223":
									entity.setComponentVariation(6, 109+maleShoesAdd, 5, 0);
									break;
								case "shoes224":
									entity.setComponentVariation(6, 110+maleShoesAdd, 0, 0);
									break;
								case "shoes225":
									entity.setComponentVariation(6, 110+maleShoesAdd, 1, 0);
									break;
								case "shoes226":
									entity.setComponentVariation(6, 110+maleShoesAdd, 2, 0);
									break;
								case "shoes227":
									entity.setComponentVariation(6, 110+maleShoesAdd, 3, 0);
									break;
								case "shoes228":
									entity.setComponentVariation(6, 110+maleShoesAdd, 4, 0);
									break;
								case "shoes229":
									entity.setComponentVariation(6, 110+maleShoesAdd, 5, 0);
									break;
								case "shoes230":
									entity.setComponentVariation(6, 110+maleShoesAdd, 6, 0);
									break;
								case "shoes231":
									entity.setComponentVariation(6, 110+maleShoesAdd, 7, 0);
									break;
								case "shoes232":
									entity.setComponentVariation(6, 110+maleShoesAdd, 8, 0);
									break;
								case "shoes233":
									entity.setComponentVariation(6, 111+maleShoesAdd, 0, 0);
									break;
								case "shoes234":
									entity.setComponentVariation(6, 112+maleShoesAdd, 0, 0);
									break;
								case "shoes235":
									entity.setComponentVariation(6, 113+maleShoesAdd, 0, 0);
									break;
								case "shoes236":
									entity.setComponentVariation(6, 113+maleShoesAdd, 1, 0);
									break;
								case "shoes237":
									entity.setComponentVariation(6, 113+maleShoesAdd, 2, 0);
									break;
								case "shoes238":
									entity.setComponentVariation(6, 113+maleShoesAdd, 3, 0);
									break;
								case "shoes239":
									entity.setComponentVariation(6, 113+maleShoesAdd, 4, 0);
									break;
								case "shoes240":
									entity.setComponentVariation(6, 10, 0, 0);
									break;
								case "shoes241":
									entity.setComponentVariation(6, 71, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.shoes = true;
									break;
							}
						}else{
							switch(clothesData["shoes"].hash) {
								case "shoes1":
									entity.setComponentVariation(6, 1, 1, 1);
									break;
								case "shoes2":
									entity.setComponentVariation(6, 0, 0, 0);
									break;
								case "shoes3":
									entity.setComponentVariation(6, 0, 1, 0);
									break;
								case "shoes4":
									entity.setComponentVariation(6, 0, 2, 0);
									break;
								case "shoes5":
									entity.setComponentVariation(6, 0, 3, 0);
									break;
								case "shoes6":
									entity.setComponentVariation(6, 1, 0, 0);
									break;
								case "shoes7":
									entity.setComponentVariation(6, 1, 1, 0);
									break;
								case "shoes8":
									entity.setComponentVariation(6, 1, 2, 0);
									break;
								case "shoes9":
									entity.setComponentVariation(6, 1, 3, 0);
									break;
								case "shoes10":
									entity.setComponentVariation(6, 1, 4, 0);
									break;
								case "shoes11":
									entity.setComponentVariation(6, 1, 5, 0);
									break;
								case "shoes12":
									entity.setComponentVariation(6, 1, 6, 0);
									break;
								case "shoes13":
									entity.setComponentVariation(6, 1, 7, 0);
									break;
								case "shoes14":
									entity.setComponentVariation(6, 1, 8, 0);
									break;
								case "shoes15":
									entity.setComponentVariation(6, 1, 9, 0);
									break;
								case "shoes16":
									entity.setComponentVariation(6, 1, 10, 0);
									break;
								case "shoes17":
									entity.setComponentVariation(6, 1, 11, 0);
									break;
								case "shoes18":
									entity.setComponentVariation(6, 1, 12, 0);
									break;
								case "shoes19":
									entity.setComponentVariation(6, 1, 13, 0);
									break;
								case "shoes20":
									entity.setComponentVariation(6, 1, 14, 0);
									break;
								case "shoes21":
									entity.setComponentVariation(6, 1, 15, 0);
									break;
								case "shoes22":
									entity.setComponentVariation(6, 2, 0, 0);
									break;
								case "shoes23":
									entity.setComponentVariation(6, 2, 1, 0);
									break;
								case "shoes24":
									entity.setComponentVariation(6, 2, 2, 0);
									break;
								case "shoes25":
									entity.setComponentVariation(6, 2, 3, 0);
									break;
								case "shoes26":
									entity.setComponentVariation(6, 2, 4, 0);
									break;
								case "shoes27":
									entity.setComponentVariation(6, 2, 5, 0);
									break;
								case "shoes28":
									entity.setComponentVariation(6, 2, 6, 0);
									break;
								case "shoes29":
									entity.setComponentVariation(6, 2, 7, 0);
									break;
								case "shoes30":
									entity.setComponentVariation(6, 2, 8, 0);
									break;
								case "shoes31":
									entity.setComponentVariation(6, 2, 9, 0);
									break;
								case "shoes32":
									entity.setComponentVariation(6, 2, 10, 0);
									break;
								case "shoes33":
									entity.setComponentVariation(6, 2, 11, 0);
									break;
								case "shoes34":
									entity.setComponentVariation(6, 2, 12, 0);
									break;
								case "shoes35":
									entity.setComponentVariation(6, 2, 13, 0);
									break;
								case "shoes36":
									entity.setComponentVariation(6, 2, 14, 0);
									break;
								case "shoes37":
									entity.setComponentVariation(6, 2, 15, 0);
									break;
								case "shoes38":
									entity.setComponentVariation(6, 3, 0, 0);
									break;
								case "shoes39":
									entity.setComponentVariation(6, 3, 1, 0);
									break;
								case "shoes40":
									entity.setComponentVariation(6, 3, 2, 0);
									break;
								case "shoes41":
									entity.setComponentVariation(6, 3, 3, 0);
									break;
								case "shoes42":
									entity.setComponentVariation(6, 3, 4, 0);
									break;
								case "shoes43":
									entity.setComponentVariation(6, 3, 5, 0);
									break;
								case "shoes44":
									entity.setComponentVariation(6, 3, 6, 0);
									break;
								case "shoes45":
									entity.setComponentVariation(6, 3, 7, 0);
									break;
								case "shoes46":
									entity.setComponentVariation(6, 3, 8, 0);
									break;
								case "shoes47":
									entity.setComponentVariation(6, 3, 9, 0);
									break;
								case "shoes48":
									entity.setComponentVariation(6, 3, 10, 0);
									break;
								case "shoes49":
									entity.setComponentVariation(6, 3, 11, 0);
									break;
								case "shoes50":
									entity.setComponentVariation(6, 3, 12, 0);
									break;
								case "shoes51":
									entity.setComponentVariation(6, 3, 13, 0);
									break;
								case "shoes52":
									entity.setComponentVariation(6, 3, 14, 0);
									break;
								case "shoes53":
									entity.setComponentVariation(6, 3, 15, 0);
									break;
								case "shoes54":
									entity.setComponentVariation(6, 5, 0, 0);
									break;
								case "shoes55":
									entity.setComponentVariation(6, 5, 1, 0);
									break;
								case "shoes56":
									entity.setComponentVariation(6, 7, 0, 0);
									break;
								case "shoes57":
									entity.setComponentVariation(6, 7, 1, 0);
									break;
								case "shoes58":
									entity.setComponentVariation(6, 7, 2, 0);
									break;
								case "shoes59":
									entity.setComponentVariation(6, 7, 3, 0);
									break;
								case "shoes60":
									entity.setComponentVariation(6, 7, 4, 0);
									break;
								case "shoes61":
									entity.setComponentVariation(6, 7, 5, 0);
									break;
								case "shoes62":
									entity.setComponentVariation(6, 7, 6, 0);
									break;
								case "shoes63":
									entity.setComponentVariation(6, 7, 7, 0);
									break;
								case "shoes64":
									entity.setComponentVariation(6, 7, 8, 0);
									break;
								case "shoes65":
									entity.setComponentVariation(6, 7, 9, 0);
									break;
								case "shoes66":
									entity.setComponentVariation(6, 7, 10, 0);
									break;
								case "shoes67":
									entity.setComponentVariation(6, 7, 11, 0);
									break;
								case "shoes68":
									entity.setComponentVariation(6, 7, 12, 0);
									break;
								case "shoes69":
									entity.setComponentVariation(6, 7, 13, 0);
									break;
								case "shoes70":
									entity.setComponentVariation(6, 7, 14, 0);
									break;
								case "shoes71":
									entity.setComponentVariation(6, 7, 15, 0);
									break;
								case "shoes72":
									entity.setComponentVariation(6, 10, 0, 0);
									break;
								case "shoes73":
									entity.setComponentVariation(6, 10, 1, 0);
									break;
								case "shoes74":
									entity.setComponentVariation(6, 10, 2, 0);
									break;
								case "shoes75":
									entity.setComponentVariation(6, 10, 3, 0);
									break;
								case "shoes76":
									entity.setComponentVariation(6, 11, 0, 0);
									break;
								case "shoes77":
									entity.setComponentVariation(6, 11, 1, 0);
									break;
								case "shoes78":
									entity.setComponentVariation(6, 11, 2, 0);
									break;
								case "shoes79":
									entity.setComponentVariation(6, 11, 3, 0);
									break;
								case "shoes80":
									entity.setComponentVariation(6, 13, 0, 0);
									break;
								case "shoes81":
									entity.setComponentVariation(6, 13, 1, 0);
									break;
								case "shoes82":
									entity.setComponentVariation(6, 13, 2, 0);
									break;
								case "shoes83":
									entity.setComponentVariation(6, 13, 3, 0);
									break;
								case "shoes84":
									entity.setComponentVariation(6, 13, 4, 0);
									break;
								case "shoes85":
									entity.setComponentVariation(6, 13, 5, 0);
									break;
								case "shoes86":
									entity.setComponentVariation(6, 13, 6, 0);
									break;
								case "shoes87":
									entity.setComponentVariation(6, 13, 7, 0);
									break;
								case "shoes88":
									entity.setComponentVariation(6, 13, 8, 0);
									break;
								case "shoes89":
									entity.setComponentVariation(6, 13, 9, 0);
									break;
								case "shoes90":
									entity.setComponentVariation(6, 13, 10, 0);
									break;
								case "shoes91":
									entity.setComponentVariation(6, 13, 11, 0);
									break;
								case "shoes92":
									entity.setComponentVariation(6, 13, 12, 0);
									break;
								case "shoes93":
									entity.setComponentVariation(6, 13, 13, 0);
									break;
								case "shoes94":
									entity.setComponentVariation(6, 13, 14, 0);
									break;
								case "shoes95":
									entity.setComponentVariation(6, 13, 15, 0);
									break;
								case "shoes96":
									entity.setComponentVariation(6, 14, 0, 0);
									break;
								case "shoes97":
									entity.setComponentVariation(6, 14, 1, 0);
									break;
								case "shoes98":
									entity.setComponentVariation(6, 14, 2, 0);
									break;
								case "shoes99":
									entity.setComponentVariation(6, 14, 3, 0);
									break;
								case "shoes100":
									entity.setComponentVariation(6, 14, 4, 0);
									break;
								case "shoes101":
									entity.setComponentVariation(6, 14, 5, 0);
									break;
								case "shoes102":
									entity.setComponentVariation(6, 14, 6, 0);
									break;
								case "shoes103":
									entity.setComponentVariation(6, 14, 7, 0);
									break;
								case "shoes104":
									entity.setComponentVariation(6, 14, 8, 0);
									break;
								case "shoes105":
									entity.setComponentVariation(6, 14, 9, 0);
									break;
								case "shoes106":
									entity.setComponentVariation(6, 14, 10, 0);
									break;
								case "shoes107":
									entity.setComponentVariation(6, 14, 11, 0);
									break;
								case "shoes108":
									entity.setComponentVariation(6, 14, 12, 0);
									break;
								case "shoes109":
									entity.setComponentVariation(6, 14, 13, 0);
									break;
								case "shoes110":
									entity.setComponentVariation(6, 14, 14, 0);
									break;
								case "shoes111":
									entity.setComponentVariation(6, 14, 15, 0);
									break;
								case "shoes112":
									entity.setComponentVariation(6, 32, 0, 0);
									break;
								case "shoes113":
									entity.setComponentVariation(6, 32, 1, 0);
									break;
								case "shoes114":
									entity.setComponentVariation(6, 32, 2, 0);
									break;
								case "shoes115":
									entity.setComponentVariation(6, 32, 3, 0);
									break;
								case "shoes116":
									entity.setComponentVariation(6, 32, 4, 0);
									break;
								case "shoes117":
									entity.setComponentVariation(6, 33, 0, 0);
									break;
								case "shoes118":
									entity.setComponentVariation(6, 33, 1, 0);
									break;
								case "shoes119":
									entity.setComponentVariation(6, 33, 2, 0);
									break;
								case "shoes120":
									entity.setComponentVariation(6, 33, 3, 0);
									break;
								case "shoes121":
									entity.setComponentVariation(6, 33, 4, 0);
									break;
								case "shoes122":
									entity.setComponentVariation(6, 33, 5, 0);
									break;
								case "shoes123":
									entity.setComponentVariation(6, 33, 6, 0);
									break;
								case "shoes124":
									entity.setComponentVariation(6, 33, 7, 0);
									break;
								case "shoes125":
									entity.setComponentVariation(6, 43, 0, 0);
									break;
								case "shoes126":
									entity.setComponentVariation(6, 43, 1, 0);
									break;
								case "shoes127":
									entity.setComponentVariation(6, 43, 2, 0);
									break;
								case "shoes128":
									entity.setComponentVariation(6, 43, 3, 0);
									break;
								case "shoes129":
									entity.setComponentVariation(6, 43, 4, 0);
									break;
								case "shoes130":
									entity.setComponentVariation(6, 43, 5, 0);
									break;
								case "shoes131":
									entity.setComponentVariation(6, 43, 6, 0);
									break;
								case "shoes132":
									entity.setComponentVariation(6, 43, 7, 0);
									break;
								case "shoes133":
									entity.setComponentVariation(6, 58, 0, 0);
									break;
								case "shoes134":
									entity.setComponentVariation(6, 58, 1, 0);
									break;
								case "shoes135":
									entity.setComponentVariation(6, 58, 2, 0);
									break;
								case "shoes136":
									entity.setComponentVariation(6, 58, 3, 0);
									break;
								case "shoes137":
									entity.setComponentVariation(6, 58, 4, 0);
									break;
								case "shoes138":
									entity.setComponentVariation(6, 58, 5, 0);
									break;
								case "shoes139":
									entity.setComponentVariation(6, 58, 6, 0);
									break;
								case "shoes140":
									entity.setComponentVariation(6, 58, 7, 0);
									break;
								case "shoes141":
									entity.setComponentVariation(6, 58, 8, 0);
									break;
								case "shoes142":
									entity.setComponentVariation(6, 58, 9, 0);
									break;
								case "shoes143":
									entity.setComponentVariation(6, 60, 0, 0);
									break;
								case "shoes144":
									entity.setComponentVariation(6, 60, 1, 0);
									break;
								case "shoes145":
									entity.setComponentVariation(6, 60, 2, 0);
									break;
								case "shoes146":
									entity.setComponentVariation(6, 60, 3, 0);
									break;
								case "shoes147":
									entity.setComponentVariation(6, 60, 4, 0);
									break;
								case "shoes148":
									entity.setComponentVariation(6, 60, 5, 0);
									break;
								case "shoes149":
									entity.setComponentVariation(6, 60, 6, 0);
									break;
								case "shoes150":
									entity.setComponentVariation(6, 60, 7, 0);
									break;
								case "shoes151":
									entity.setComponentVariation(6, 60, 8, 0);
									break;
								case "shoes152":
									entity.setComponentVariation(6, 60, 9, 0);
									break;
								case "shoes153":
									entity.setComponentVariation(6, 60, 10, 0);
									break;
								case "shoes154":
									entity.setComponentVariation(6, 60, 11, 0);
									break;
								case "shoes155":
									entity.setComponentVariation(6, 97, 0, 0);
									break;
								case "shoes156":
									entity.setComponentVariation(6, 97, 1, 0);
									break;
								case "shoes157":
									entity.setComponentVariation(6, 97, 2, 0);
									break;
								case "shoes158":
									entity.setComponentVariation(6, 97, 3, 0);
									break;
								case "shoes159":
									entity.setComponentVariation(6, 97, 4, 0);
									break;
								case "shoes160":
									entity.setComponentVariation(6, 97, 5, 0);
									break;
								case "shoes161":
									entity.setComponentVariation(6, 97, 6, 0);
									break;
								case "shoes162":
									entity.setComponentVariation(6, 97, 7, 0);
									break;
								case "shoes163":
									entity.setComponentVariation(6, 97, 8, 0);
									break;
								case "shoes164":
									entity.setComponentVariation(6, 97, 9, 0);
									break;
								case "shoes165":
									entity.setComponentVariation(6, 97, 10, 0);
									break;
								case "shoes166":
									entity.setComponentVariation(6, 97, 11, 0);
									break;
								case "shoes167":
									entity.setComponentVariation(6, 97, 12, 0);
									break;
								case "shoes168":
									entity.setComponentVariation(6, 97, 13, 0);
									break;
								case "shoes169":
									entity.setComponentVariation(6, 97, 14, 0);
									break;
								case "shoes170":
									entity.setComponentVariation(6, 81, 0, 0);
									break;
								case "shoes171":
									entity.setComponentVariation(6, 81, 1, 0);
									break;
								case "shoes172":
									entity.setComponentVariation(6, 81, 2, 0);
									break;
								case "shoes173":
									entity.setComponentVariation(6, 81, 3, 0);
									break;
								case "shoes174":
									entity.setComponentVariation(6, 81, 4, 0);
									break;
								case "shoes175":
									entity.setComponentVariation(6, 81, 5, 0);
									break;
								case "shoes176":
									entity.setComponentVariation(6, 81, 6, 0);
									break;
								case "shoes177":
									entity.setComponentVariation(6, 81, 7, 0);
									break;
								case "shoes178":
									entity.setComponentVariation(6, 81, 8, 0);
									break;
								case "shoes179":
									entity.setComponentVariation(6, 81, 9, 0);
									break;
								case "shoes180":
									entity.setComponentVariation(6, 81, 10, 0);
									break;
								case "shoes181":
									entity.setComponentVariation(6, 81, 11, 0);
									break;
								case "shoes182":
									entity.setComponentVariation(6, 81, 12, 0);
									break;
								case "shoes183":
									entity.setComponentVariation(6, 81, 13, 0);
									break;
								case "shoes184":
									entity.setComponentVariation(6, 81, 14, 0);
									break;
								case "shoes185":
									entity.setComponentVariation(6, 81, 15, 0);
									break;
								case "shoes186":
									entity.setComponentVariation(6, 81, 16, 0);
									break;
								case "shoes187":
									entity.setComponentVariation(6, 81, 17, 0);
									break;
								case "shoes188":
									entity.setComponentVariation(6, 81, 18, 0);
									break;
								case "shoes189":
									entity.setComponentVariation(6, 81, 19, 0);
									break;
								case "shoes190":
									entity.setComponentVariation(6, 81, 20, 0);
									break;
								case "shoes191":
									entity.setComponentVariation(6, 81, 21, 0);
									break;
								case "shoes192":
									entity.setComponentVariation(6, 81, 22, 0);
									break;
								case "shoes193":
									entity.setComponentVariation(6, 81, 23, 0);
									break;
								case "shoes194":
									entity.setComponentVariation(6, 81, 24, 0);
									break;
								case "shoes195":
									entity.setComponentVariation(6, 81, 25, 0);
									break;
								case "shoes196":
									entity.setComponentVariation(6, 29, 0, 0);
									break;
								case "shoes197":
									entity.setComponentVariation(6, 74, 0, 0);
									if(entity == localPlayer) fireJob.firesuit.shoes = true;
									break;
							}
						}
					}else{
						if(clothesData.npGender == "male") entity.setComponentVariation(6, 34, 0, 0);
						else entity.setComponentVariation(6, 35, 0, 0);
					}
				}
			}
		}
	}
}
}