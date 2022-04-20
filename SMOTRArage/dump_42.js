{
var noCheckSpoofOne = false;
mp.events.add('sleepAntiCheat', () => {
	//mp.game.ui.messages.showMidsized("~r~ANTICHEAT SLEEPED 3 SEC");
	Behaviour.sleep(4);
	noCheckSpoofOne = true;
});
//mp.events.call("sleepAntiCheat");

let noRepeatAntiCheat = false;
var antiCheatLogined = false;

function antiCheatDetected(reason, withOutCheckSleep) {
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 1</span>");
	if(typeof(localPlayer.getVariable("player.spec")) === undefined || !localPlayer.getVariable("player.spec")) {
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 2</span>");
		/*if(typeof(localPlayer.getVariable("player.status")) !== "undefined") {
			if(localPlayer.getVariable("player.status") == "admin") return false;
		}*/
		if(typeof(withOutCheckSleep) !== "undefined") mp.events.callRemote('kickAct', localPlayer, reason);
		const fly = global.fly;
		
		if(!localPlayer.getVariable("player.id")) return false;
		
		if(fly.flying) return false;
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 3</span>");
		if(!antiCheatLogined) return false;
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 4</span>");
		if(!Behaviour.active) return false;
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 5</span>");
		if(!noRepeatAntiCheat) {
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 6</span>");
			noRepeatAntiCheat = true;
			mp.events.callRemote('kickAct', localPlayer, reason);
		}
	}
}

mp.events.add('client:weaponSwap', () => {
	Behaviour.resetWeapon();
})

mp.keys.bind(0x52, true, () => {
	Behaviour.reloading = true
	setTimeout(() => {
		Behaviour.magazin = mp.game.weapon.getWeaponClipSize(mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle))
		Behaviour.reloading = false
	}, 2000);
})

class PlayerBehaviour {
	constructor() {
		this.active = true;
		this.date = new Date().getTime();
		this.flags, this.hits = 0;
		this.reloadingWeapon = false;
		this.pos = localPlayer.position;
		this.noclipWarns = 0;
		this.engineWarns = 0;
		
		this.oldHP = localPlayer.getHealth()*2;
		if(localPlayer.getHealth() <= 100) this.oldHP = 100 + localPlayer.getHealth();
		
		this.health = Number(localPlayer.getHealth()) + Number(localPlayer.getArmour());
		this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle);
		this.magazin = mp.game.weapon.getWeaponClipSize(this.weapon);
		this.firstshot = true;
		if(localPlayer.vehicle) {
			this.inVehPos = localPlayer.vehicle.position;
			this.inVehRotVel = localPlayer.vehicle.getRotationVelocity();
			this.inVehSpeed = localPlayer.vehicle.getSpeed() * 3.6;
		}else{
			this.inVehPos = localPlayer.position;
			this.inVehRotVel = {"x":0,"y":0,"z":0};
			this.inVehSpeed = 0;
		}
		
		
	}
	sleep(duration) {
		this.active = false;
		setTimeout(() => { Behaviour = new PlayerBehaviour(); }, duration*1000);
	}
	isRagdollOnHeight(height) {
		this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat(0), false);
		if (Math.abs(localPlayer.position.z - this.range_to_btm)>Math.abs(height-this.range_to_btm)) {
			if (!this.isWalking()) {
				return false;
			} else if(this.active && this.range_to_btm>0) {
				return true;
			}
			return false
		}
	} 
	isWalking() {
		if(localPlayer.isFalling() || localPlayer.isRagdoll()) return false
		else if(!localPlayer.vehicle) return true
	}
	subtractVector(v1,v2) {
		return {"x": v1.x - v2.x,"y": v1.y - v2.y,"z": v1.z - v2.z}
	}
	VehicleFasterThanMax() {
		let vehMaxSpeed = 480;
		
		let customSpeed = false;
		if(typeof(localPlayer.vehicle.getVariable("veh.params")) !== "undefined") {
			let vehParams = JSON.parse(localPlayer.vehicle.getVariable("veh.params"));
			if(typeof(vehParams.maxSpeed) !== "undefined") customSpeed = parseInt(vehParams.maxSpeed);
		}
		
		if(localPlayer.vehicle.getVariable("veh.hash") !== "undefined") {
			let vehHash = localPlayer.vehicle.getVariable("veh.hash").toString();
			let decVehStats = CryptoJS.AES.decrypt(vehStats, krKey);
			decVehStats = JSON.parse(decVehStats.toString(CryptoJS.enc.Utf8));
			if(typeof(decVehStats[0][vehHash]) != "undefined") vehMaxSpeed = parseInt(decVehStats[0][vehHash].maxSpeed) + 10;
		}
		
		if(customSpeed) vehMaxSpeed = customSpeed;
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+(localPlayer.vehicle.getSpeed()*3.6)+" | "+vehMaxSpeed+"</span>");
		if(localPlayer.vehicle) return localPlayer.vehicle.getSpeed()*3.6 > (vehMaxSpeed + 10);
		return false;
	}
	checkCarPos(maxHeight = 10) {
		if(localPlayer.vehicle) {
			if(localPlayer.position.z > 0) {
				if(parseInt(localPlayer.vehicle.getClass()) == 8) {
					maxHeight = 3;
					this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat(0), false);
					if(localPlayer.position.z-this.range_to_btm > maxHeight+this.range_to_btm && this.range_to_btm > 0) return (localPlayer.position.z-this.range_to_btm);
					return false;
				}else if(parseInt(localPlayer.vehicle.getClass())!=15 && parseInt(localPlayer.vehicle.getClass())!=16 && parseInt(localPlayer.vehicle.getClass())!=14) {
					this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat(0), false);
					if(localPlayer.position.z-this.range_to_btm > maxHeight+this.range_to_btm && this.range_to_btm > 0) return (localPlayer.position.z-this.range_to_btm);
					return false;
				}
			}
		}
	}
	checkCarRotVel(maxRotVel = 2) {
		if(localPlayer.vehicle) {
			if(typeof(Behaviour.inVehRotVel.x) !== "undefined") {
				if((Behaviour.inVehRotVel.x > maxRotVel || Behaviour.inVehRotVel.x < -maxRotVel) || (Behaviour.inVehRotVel.y > maxRotVel || Behaviour.inVehRotVel.y < -maxRotVel) || (Behaviour.inVehRotVel.z > maxRotVel || Behaviour.inVehRotVel.z < -maxRotVel)) return false;
				else return true;
			}
		}
	}
	checkWeaponhash() {
		let h = this.weapon
		/*if(h == 1119849093 || h == -1312131151 || h == -1355376991 || h == 1198256469 || h == 1834241177 || h == -1238556825 || h == -1568386805 || h == -1045183535) {
			return true
		}*/
		//if(h) return true
		return false
	}
	resetWeapon() {
		this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle)
		this.magazin = mp.game.weapon.getWeaponClipSize(this.weapon)
		this.reloadingWeapon = false
	}
	updateMagSize() {
		this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle)
		/*if(this.firstshot) {
			this.firstshot = false
			this.resetWeapon()
		}*/
		this.magazin -= 1
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * В магазине: "+this.magazin+"</span>");
		if(this.magazin<=0) {
			this.reloadingWeapon = true
			setTimeout(() => {
				this.reloadingWeapon = false
				this.resetWeapon()
			}, 1250);
		}
	}
}
var Behaviour = new PlayerBehaviour();

var afkPause = mp.game.ui.isPauseMenuActive();
var afkPos = false, afkPosLast = {"x":0,"y":0,"z":0}, afkPosWarns = 0;
var afkFocused = !mp.system.isFocused;

var spoofTicker = 0, aqualangTicker = 0;
setInterval(() => {
	trailersSyncAttachChecker();
	trafficSyncChecker();
	
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * enabled</span>");
	
	this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, localPlayer.handle)
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * OPANA: "+mp.game.invoke(`0x7A3F19700A4D0525`).toString()+"</span>");
	
	if(typeof(Behaviour.date) !== "undefined") {
		let curDate = new Date().getTime();
		let timeRaznitca = parseInt(curDate) - parseInt(Behaviour.date);
		if(timeRaznitca > 50000 || timeRaznitca < -50000) return antiCheatDetected('Не меняйте время вашего ПК'); // было 30к
		Behaviour.date = curDate;
	}
	
	let Difference = Behaviour.subtractVector(Behaviour.pos, localPlayer.position);
	
	if(!localPlayer.isDead() && (courierMomentStart || taxiMomentStart || truckMomentStart || wineryDeliveryMomentStart) && (Math.abs(Difference.x) > 200 || Math.abs(Difference.y) > 200)) {
		if(localPlayer.getParachuteState() == -1) {
			if(!vehLeaveRecently) {
				return antiCheatDetected('Читы, flyhack или телепорт #3');
			}else{
				if(localPlayer.isRagdoll()) return antiCheatDetected('Читы, flyhack или телепорт #4');
			}
		}
	}
	
	mp.blips.forEach(
		(blip, id) => {
			if(blip) {
				if(mp.blips.exists(blip)) {
					if(typeof(blip.playerHandle) !== "undefined") {
						if(!mp.players.atHandle(blip.playerHandle)) blip.destroy();
					}
				}
			}
		}
	);
	
	if(Behaviour.active) {
		/*let curHP = localPlayer.getHealth()*2;
		if(localPlayer.getHealth() <= 100) curHP = 100 + localPlayer.getHealth();
		if(curHP > Behaviour.oldHP) return antiCheatDetected('Читы, восстановление здоровья');*/
		
		if(!localPlayer.train) {
			if(!vehLeaveRecently && (Math.abs(Difference.x) > 40 || Math.abs(Difference.y) > 40) && localPlayer.getParachuteState() == -1) {
				if(typeof(localPlayer.getVariable("player.id")) !== "undefined") {
					if(Behaviour.isWalking() && !localPlayer.isOnVehicle()) {
						return antiCheatDetected('Читы, flyhack или телепорт #1');
					}else{
						let tempDist1 = mp.game.system.vdist(Behaviour.pos.x, Behaviour.pos.y, Behaviour.pos.z, localPlayer.position.x, localPlayer.position.y, localPlayer.position.z);
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * DIST: "+tempDist1+"</span>");
						if(tempDist1 > 100) {
							if(!localPlayer.vehicle && !localPlayer.isOnVehicle() && typeof(localPlayer.getVariable("player.id")) !== "undefined") return antiCheatDetected('Читы, flyhack или телепорт #2');
						}
					}
				}
			}
		}
		
		if(localPlayer.vehicle || localPlayer.train) {
			let theVeh = localPlayer.vehicle;
			if(theVeh) {
				Behaviour.inVehRotVel = theVeh.getRotationVelocity();
				if(theVeh.dimension == 0) {
					let curVehPos = theVeh.position;
					if(typeof(Behaviour.inVehPos) !== "undefined") {
						//chatAPI.sysPush("<span style=\"color:#FF6146\"> * CLASS: "+theVeh.getClass()+" | DIST: "+mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true)+"</span>");
						if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
							let vehHash = theVeh.getVariable("veh.hash").toString();
							if(theVeh.getClass() == 16) {
								if(vehHash == "duster" || vehHash == "cuban800" || vehHash == "mammatus" || vehHash == "velum") {
									if(typeof(Behaviour.inVehPos.x) !== "undefined" && mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true) > 320) return antiCheatDetected('Читы, ускорение на авиатранспорте');
								}else{
									if(typeof(Behaviour.inVehPos.x) !== "undefined" && mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true) > 560) return antiCheatDetected('Читы, ускорение на авиатранспорте');
								}
							}else{
								if(vehHash == "faggio") {
									if(typeof(Behaviour.inVehPos.x) !== "undefined" && mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true) > 115) return antiCheatDetected('Читы, телепорт на мопеде');
								}else{
									if(typeof(Behaviour.inVehPos.x) !== "undefined" && mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true) > 450) return antiCheatDetected('Читы, телепорт в транспорте');
								}
							}
						}else{
							if(typeof(Behaviour.inVehPos.x) !== "undefined" && mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true) > 420) return antiCheatDetected('Читы, телепорт в транспорте');
						}
					}
					if(Behaviour.inVehPos.z <= theVeh.position.z) {
						if(Behaviour.checkCarPos(10) && Behaviour.checkCarRotVel(0.7) && (Behaviour.inVehSpeed < (localPlayer.vehicle.getSpeed() * 3.6)+10) && vehSeat == -1) return antiCheatDetected('Читы на полёт в транспорте');
					}
				}
				if(typeof(theVeh.getVariable("veh.hash")) !== "undefined") {
					if(typeof(vehSeat) !== "undefined") {
						if(Behaviour.VehicleFasterThanMax() && vehSeat == -1) {
							if(typeof(localPlayer.getVariable("player.id")) !== "undefined") return antiCheatDetected('Читы, спидхак');
						}
					}
				}
			}else{
				
				if(localPlayer.train) {
					let curVehPos = localPlayer.position;
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+JSON.stringify(curVehPos)+" | "+JSON.stringify(Behaviour.inVehPos)+"</span>");
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true).toString()+"</span>");
					if(typeof(Behaviour.inVehPos.x) !== "undefined" && mp.game.gameplay.getDistanceBetweenCoords(curVehPos.x, curVehPos.y, curVehPos.z, Behaviour.inVehPos.x, Behaviour.inVehPos.y, Behaviour.inVehPos.z, true) > 220) return antiCheatDetected('Читы, телепорт на поезде');
				}else{
					Behaviour.inVehPos = localPlayer.position;
					Behaviour.inVehRotVel = {"x":0,"y":0,"z":0};
				}
			}
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * localPlayer.vehicle.getClass()): "+localPlayer.vehicle.getClass().toString()+"</span>");
		}else{
			Behaviour.inVehPos = localPlayer.position;
			Behaviour.inVehRotVel = {"x":0,"y":0,"z":0};
			Behaviour.inVehSpeed = 0;
		}
		if(Math.abs(localPlayer.getHeightAboveGround()) > 5 && mp.game.invoke("0x4805D2B1D8CF94A9", localPlayer.handle) == 0 && localPlayer.getParachuteState() == -1 && (Math.abs(Difference.x) > 10 || Math.abs(Difference.y) > 10)) {
			Behaviour.noclipWarns++;
			if(localPlayer.vehicle && Behaviour.noclipWarns >= 3) antiCheatDetected('Читы, no-clip');
			else if(Behaviour.noclipWarns >= 6) antiCheatDetected('Читы, no-clip');
		}else{
			if(Behaviour.noclipWarns > 0) Behaviour.noclipWarns--;
		}
		Behaviour.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat(0), false);
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+this.range_to_btm+" | "+(localPlayer.position.z-this.range_to_btm)+" | "+(30+this.range_to_btm)+"</span>");
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * 281: "+localPlayer.getIsTaskActive(281).toString()+" | 280: "+localPlayer.getIsTaskActive(280).toString()+" | 235: "+localPlayer.getIsTaskActive(235).toString()+"</span>");
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * underWater: "+localPlayer.isSwimmingUnderWater().toString()+" | waterTimeRemaining: "+mp.game.player.getUnderwaterTimeRemaining().toString()+"</span>");
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * underWater: "+localPlayer.isSwimmingUnderWater().toString()+" | waterTimeRemaining: "+mp.game.player.getUnderwaterTimeRemaining().toString()+"</span>");
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * waterHeight: "+mp.game.water.getWaterHeight(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, 0).toString()+"</span>");
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * isInWater: "+localPlayer.isInWater().toString()+" | Speed: "+mp.game.invoke("0x4805D2B1D8CF94A9", localPlayer.handle).toString()+"</span>");
	}
	Behaviour.pos = localPlayer.position;
	if(localPlayer.vehicle || localPlayer.train) {
		if(localPlayer.vehicle) {
			Behaviour.inVehPos = localPlayer.vehicle.position;
			Behaviour.inVehSpeed = localPlayer.vehicle.getSpeed() * 3.6;
		}else if(localPlayer.train) {
			Behaviour.inVehPos = localPlayer.position;
		}
	}
	
	spoofTicker++;
	//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+spoofTicker+"</span>");
	if(spoofTicker == 3) {
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * TICK</span>");
		spoofTicker = 0;
		if(localPlayer.vehicle && vehSeat == -1 && typeof(localPlayer.vehicle.getVariable("vehicle.engine")) !== "undefined") {
			if(localPlayer.vehicle.getSpeed() > 15) {
				if(!localPlayer.vehicle.getVariable("vehicle.engine") && localPlayer.vehicle.getIsEngineRunning() == 1) {
					Behaviour.engineWarns++;
					localPlayer.vehicle.setEngineOn(false, false, false);
					if(Behaviour.engineWarns >= 3) return antiCheatDetected('Читы на двигатель');
				}else {
					if(Behaviour.engineWarns > 0) Behaviour.engineWarns--;
				}
			}
			vehFuelProcessor();
		}
		if(Behaviour.active) {
			if(!noCheckSpoofOne) {
				if(antiCheatLogined && localPlayer.getVariable("player.money") && localPlayer.getVariable("player.bank") && localPlayer.getVariable("player.donate") && localPlayer.getVariable("player.tickets") && localPlayer.getVariable("player.vehs") && localPlayer.getVariable("player.houses") && localPlayer.getVariable("player.businesses")) {
					let myMoney = parseInt(localPlayer.getVariable("player.money"));
					let myBank = parseInt(localPlayer.getVariable("player.bank"));
					let myDonate = parseInt(localPlayer.getVariable("player.donate"));
					let myTickets = parseInt(localPlayer.getVariable("player.tickets"));
					
					//let myVehs = JSON.stringify(localPlayer.getVariable("player.vehs"));
					//let myHouses = JSON.stringify(localPlayer.getVariable("player.houses"));
					//let myBusinesses = JSON.stringify(localPlayer.getVariable("player.businesses"));
					
					//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Check spoof</span>");
					
					let skills = JSON.stringify(skillsProcessor());
					
					mp.events.callRemote('checkSpoofData', myMoney, myBank, myDonate, myTickets, skills);
				}
			}else{
				noCheckSpoofOne = false;
			}
			/*
			if(typeof(localPlayer.getVariable("player.id") !== "undefined")) {
				var healthBefore = Behaviour.health
				mp.players.local.applyDamageTo(1, true);
				if(localPlayer.getHealth() > 0 && healthBefore >= Behaviour.health) return antiCheatDetected('Читы на здоровье');
			}
			*/
		}
		if(typeof(localPlayer.getVariable("player.afk")) !== "undefined") {
			let afkStatus = localPlayer.getVariable("player.afk");
			afkPause = mp.game.ui.isPauseMenuActive();
			if(mp.game.system.vdist2(afkPosLast.x, afkPosLast.y, afkPosLast.z, localPlayer.position.x, localPlayer.position.y, localPlayer.position.z) < 2.5) {
				if(!afkPos) {
					if(afkPosWarns >= 15) afkPos = true;
					else afkPosWarns++;
				}
			}else{
				afkPosWarns = 0;
				afkPos = false;
			}
			afkPosLast = localPlayer.position;
			
			afkFocused = !mp.system.isFocused;
			
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * "+afkPause.toString()+" | "+afkPos.toString()+" | "+afkFocused.toString()+"</span>");
			if(afkPause || afkPos || afkFocused) {
				if(!afkStatus) {
					let imFishing = false;
					if(fishingMode) {
						if(typeof(fishingMode.bait) !== "undefined") imFishing = true;
					}
					if(!imFishing) {
						mp.events.callRemote('imAFK', true);
						mp.system.notify({
							title: 'AFK Режим',
							text: `Игровой процесс приостановлен, вы находитесь в режиме AFK.`,
							attribute: 'SMOTRArage',
							duration: 5,
							silent: true
						});
					}else{
						if(afkStatus) mp.events.callRemote('imAFK', false);
					}
				}
			}else{
				if(afkStatus) mp.events.callRemote('imAFK', false);
			}
		}
		if(typeof(curAirTask) !== "undefined") {
			if(curAirTask) checkAirJobCourse();
		}
		if(scubaDiving) {
			if(localPlayer.isSwimmingUnderWater()) {
				if(typeof(localPlayer.getVariable("player.inv")) !== "undefined") {
					let myInv = localPlayer.getVariable("player.inv");
					if(typeof(myInv.instrument) !== "undefined") {
						if(myInv.instrument.hash == "aqualang") {
							aqualangTicker++;
							if(aqualangTicker >= 3) {
								if(myInv.instrument.health <= 5) mp.game.ui.notifications.showWithPicture("Дайвинг", "~r~Опасный уровень кислорода", "~w~Остаток кислорода на ~r~"+(myInv.instrument.health*10)+" ~w~сек.", "CHAR_LJT", 1, false, 1, 2);
								mp.events.callRemoteUnreliable('aqualangDamage');
								aqualangTicker = 0;
							}
						}
					}
				}
			}
			//chatAPI.sysPush("<span style=\"color:#FF6146\"> * aqualangDamage</span>");
		}
	}
}, 3500);

let hardStaminaMats = [509508168, 1288448767, -1136057692, -1907520769, 909950165, 510490462, -1595148316, -1885547121, -1942898710, 312396330, 1635937914, -273490167, 1109728704, -700658213, 1144315879, 560985072, -461750719, 1333033863, -1286696947];
var plusSkills = false, minusSkills = false;
function skillsProcessor() {
	let skills = {"str":"not","sta":"not","weap":"not"};
	if(typeof(localPlayer.getVariable("player.blocks")) !== "undefined") {
		let myBlocks = localPlayer.getVariable("player.blocks");
		if(localPlayer.vehicle || localPlayer.getVariable("player.train")) {
			let randProc = getRandomInt(0,60);
			if(randProc == 20) skills.str = -1;
			else if(randProc == 40) skills.sta = -1;
		}else{
			if(minusSkills) {
				if(typeof(minusSkills.str) !== "undefined") skills.str = -minusSkills.str;
				if(typeof(minusSkills.sta) !== "undefined") skills.sta = -minusSkills.sta;
				if(typeof(minusSkills.weap) !== "undefined") skills.weap = -minusSkills.weap;
				minusSkills = false;
			}
			if(plusSkills) {
				if(typeof(plusSkills.str) !== "undefined") skills.str = plusSkills.str;
				if(typeof(plusSkills.sta) !== "undefined") skills.sta = plusSkills.sta;
				if(typeof(plusSkills.weap) !== "undefined") skills.weap = plusSkills.weap;
				plusSkills = false;
			}
			if(localPlayer.isSprinting()) {
				skills.sta = 1;
				let getMat = mp.raycasting.testCapsule(localPlayer.position, new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z-1.5), 1, localPlayer.handle, 1);
				if(getMat) {
					if(typeof(getMat.material) !== "undefined") {
						if(hardStaminaMats.indexOf(getMat.material) !== -1) skills.sta = 2;
					}
				}
			}else if(localPlayer.isRunning()) {
				let getMat = mp.raycasting.testCapsule(localPlayer.position, new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z-1.5), 1, localPlayer.handle, 1);
				if(getMat) {
					if(typeof(getMat.material) !== "undefined") {
						if(hardStaminaMats.indexOf(getMat.material) !== -1) skills.sta = 1;
					}
				}
			}
		}
		//chatAPI.sysPush("<span style=\"color:#FF6146\"> * SKILLS: "+JSON.stringify(skills)+"</span>");
	}
	return skills;
}

function antiCheatEnterVeh(vehicle, seat) {
	if(typeof(Behaviour) !== "undefined") {
		if(typeof(Behaviour.pos) !== "undefined" && typeof(Behaviour.active) !== "undefined") {
			if(typeof(Behaviour.pos.x) !== "undefined") {
				Behaviour.inVehPos = localPlayer.position;
				Behaviour.inVehSpeed = 0;
				Behaviour.inVehRotVel = {"x":0,"y":0,"z":0};
				let vehPos = vehicle.position;
				//chatAPI.sysPush("<span style=\"color:#FF6146\"> * Distance: "+mp.game.gameplay.getDistanceBetweenCoords(vehPos.x, vehPos.y, vehPos.z, Behaviour.pos.x, Behaviour.pos.y, Behaviour.pos.z, true)+"</span>");
				if(mp.game.gameplay.getDistanceBetweenCoords(vehPos.x, vehPos.y, vehPos.z, Behaviour.pos.x, Behaviour.pos.y, Behaviour.pos.z, true) > 40 && Behaviour.active) return antiCheatDetected('Читы на телепорт в транспорт');
			}
		}
	}
}
mp.events.add("playerEnterVehicle", antiCheatEnterVeh);
}