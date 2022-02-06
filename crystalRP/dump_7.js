{

//дефолтные проценты, которые мы будем отнимать от входящего урона
let defaultPercent = { "max": 85, "min": 40 , "head": 99};

//список оружий и их процент, который мы будем снимать с входящего урона
const weaponDamages = {
	// Пистолеты
	// хеш оружия
	3249783761: {
		//название оружия, это для нас, чтобы в будущем смогли быстро найти нужное нам оружие
		"name": "Heavy Revolver",
		//максимальный процент
		"max": 85,
		//минимальный процент
		"min": 65,
		//эти проценты нужны для функции рандома
		"head": 70
	},
	// Пистолет пулеметы
	324215364: {
		"name": "Micro SMG",
		"max": 8,
		"min": 50,
		"head": 10
	},
	736523883: {
		"name": "SMG",
		"max": 80,
		"min": 50,
		"head": 22
	},
	171789620: {
		"name": "Combat PDW", // вписать название
		"max": 60, // не трогай 
		"min": 40, // не трогай 
		"head": 15 // вписать урон в голову
	},
	// Пулеметы
	2144741730: {
		"name": "Combat MG",
		"max": 65,
		"min": 35,
		"head": 20
	},
	// Карабины
	3220176749: {
		"name": "Assault Rifle",
		"max": 70,
		"min": 45,
		"head": 20
	},
	// Дробовики
	487013001: {
		"name": "Pump Shotgun",
		"max": 80,
		"min": 30,
		"head": 5
	},
	// Снайперы
	100416529: {
		"name": "Sniper Rifle",
		"max": 80,
		"min": 50,
		"head": 105
	},
	// Холодное оружие
	3441901897: {
		"name": "Battle Axe",
		"max": 50,
		"min": 40,
		"head": -1
	},
	//fix 17.10.2021
	100416529: {
		"name": "Heavy Sniper",
		"max": 80,
		"min": 50,
		"head": 105
	},
	1649403952: {
		"name": "Compact Rifle",
		"max": 80,
		"min": 50,
		"head": 15
	},
	4024951519: {
		"name": "Assault SMG",
		"max": 80,
		"min": 50,
		"head": 11
	},
	2210333304: {
		"name": "Carbine Rifle",
		"max": 80,
		"min": 50,
		"head": 14
	},
	1627465347: {
		"name": "Gusenberg Sweeper",
		"max": 80,
		"min": 50,
		"head": 15
	},
	3675956304: {
		"name": "Machine Pistol",
		"max": 80,
		"min": 50,
		"head": 8
	},
	984333226: {
		"name": "Heavy Shotgun",
		"max": 80,
		"min": 50,
		"head": 45
	},
	2017895192: {
		"name": "Sawed-Off Shotgun",
		"max": 80,
		"min": 50,
		"head": 50
	},
	1593441988: {
		"name": "Combat Pistol",
		"max": 80,
		"min": 50,
		"head": 13
	},
	137902532: {
		"name": "Vintage Pistol",
		"max": 80,
		"min": 50,
		"head": 15
	},
	2640438543: {
		"name": "Bullpup Shotgun",
		"max": 80,
		"min": 50,
		"head": 9
	},
	453432689: {
		"name": "Pistol",
		"max": 80,
		"min": 50,
		"head": 9
	},
	2548703416: {
		"name": "Double Action",
		"max": 80,
		"min": 50,
		"head": 35
	},
	3523564046: {
		"name": "Heavy Pistol",
		"max": 80,
		"min": 50,
		"head": 30
	},
	2937143193: {
		"name": "Advanced Rifle",
		"max": 80,
		"min": 50,
		"head": 20
	},
	3173288789: {
		"name": "Mini SMG",
		"max": 80,
		"min": 50,
		"head": 10
	},
	2578377531: {
		"name": "Pistol .50",
		"max": 80,
		"min": 50,
		"head": 10
	},	
	3218215474: {
		"name": "SNS Pistol",
		"max": 80,
		"min": 50,
		"head": 13
	},
	3800352039: {
		"name": "Assault Shotgun",
		"max": 80,
		"min": 50,
		"head": 7
	},
	3686625920: {
		"name": "Combat MG MK2",
		"max": 80,
		"min": 50,
		"head": 33
	},
	177293209: {
		"name": "Heavy Sniper MK2",
		"max": 80,
		"min": 50,
		"head": 100
	},
	3415619887: {
		"name": "Heavy Revolver MK2",
		"max": 80,
		"min": 50,
		"head": 90
	},
	4208062921: {
		"name": "Carbine Rifle MK2",
		"max": 80,
		"min": 50,
		"head": 20
	},
	2526821735: {
		"name": "Special Carbine MK2",
		"max": 80,
		"min": 50,
		"head": 20
	},
	3231910285: {
		"name": "Special Carbine",
		"max": 80,
		"min": 50,
		"head": 15
	},
	961495388: {
		"name": "Assault Rifle MK2",
		"max": 80,
		"min": 50,
		"head": 25
	}
};

//Если какое-либо оружие окажется в этом списке, мы не выполним скрипт
const ignoreWeapons = {
	911657153: "Stun Gun",
};

//функция генерации рандомного числа
let randomInt = (min, max) => Math.random() * (max - min) + min;

//Событие принятия входящего попадания игроком
mp._events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
	mp.console.logInfo(`boneIndex: ${boneIndex}`);
	if (targetEntity.type === 'player' && sourcePlayer && !(weapon in ignoreWeapons)) {
		
		//Если у игрока поставлена админская неуязвимость не выполняем скрипт
		if (global.admingm || player.getVariable('green')) return true;
		//Ставим стандартный процент гасения урона
		let max = defaultPercent.max;
		let min = defaultPercent.min;
		let head = defaultPercent.head;
		let wp = "";
		//Если оружие, с которого стреляли, есть у нас в списке, то берем его процент гасения
		if (weapon in weaponDamages) {
			max = weaponDamages[weapon].max;
			min = weaponDamages[weapon].min;
			head = weaponDamages[weapon].head;
			wp = weaponDamages[weapon].name;
		}
		//Полученный значения используем для генерации случайного значения в их диапазоне
		let percent = randomInt(min, max) / 100;
		//Получаем кастомный урон, который будем применять
		

		let cDamage = damage - (damage * percent);
		switch (wp) {
			case "Heavy Revolver":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 33;
				break;
			case "Combat PDW":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 9;
				break;
			case "Assault Rifle":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 15;
				break;
			case "Pump Shotgun":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 4;
				break;
			case "Combat MG":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 14;
				break;
			case "SMG":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 12;
				break;
			case "Micro SMG":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 7;
				break;
			case "Sniper Rifle":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 65;
				break;
			case "Heavy Sniper":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 45;
				break;
			case "Compact Rifle":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 7;
				break;
			case "Assault SMG":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 7;
				break;
			case "Carbine Rifle":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 9;
				break;
			case "Gusenberg Sweeper":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 8;
				break;
			case "Machine Pistol":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 8;
				break;
			case "Heavy Shotgun":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 30;
				break;
			case "Sawed-Off Shotgun":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 40;
				break;
			case "Combat Pistol":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 10;
				break;
			case "Vintage Pistol":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 12;
				break;
			case "Bullpup Shotgun":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 4;
				break;
			case "Pistol":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 7;
				break;
			case "Double Action":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 28;
				break;
			case "Heavy Pistol":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 18;
				break;
			case "Advanced Rifle":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 10;
				break;
			case "Mini SMG":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 7;
				break;
			case "Pistol .50":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 9;
				break;
			case "SNS Pistol":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 9;
				break;
			case "Assault Shotgun":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 5;
				break;
			case "Combat MG MK2":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 18;
				break;
			case "Heavy Sniper MK2":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 80;
				break;
			case "Heavy Revolver MK2":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 45;
				break;
			case "Carbine Rifle MK2":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 15;
				break;
			case "Special Carbine MK2":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 12;
				break;
			case "Special Carbine":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 10;
				break;
			case "Assault Rifle MK2":
				if (boneIndex === 20) cDamage = head;
				else  cDamage = 18;
				break;
			default:
				if (boneIndex === 20)
					cDamage = damage - (damage * percent) / 10;
				break;
		}
		//если попадание в голову, делим урон ещё на 10, дабы уменьшить ещё, так как в голову идет очень большой урон
		//Применяем к игроку полученный урон
		if (targetEntity.getVariable("UnderAlcohol") && targetEntity.getVariable("UnderAlcohol") == true)
			cDamage -= cDamage / 100 * 35;
		if (targetEntity.getVariable("UnderBong") && targetEntity.getVariable("UnderBong") == true)
			cDamage -= cDamage / 100 * 40;
		mp.gui.chat.push(cDamage);
		targetEntity.applyDamageTo(parseInt(cDamage), true);

		/* 
		Узнаем сколько здоровья у игрока после урона
		Если игрок не умер, то отменяем стандартное событие
		Если игрок умер, то не отменяем, т.к. если отменим
		То не сработает событие playerDeath как должно
		*/
		let currentHealth = mp.players.local.getHealth();
		//Отменяем стандартное событие
		if (currentHealth > 0) {
			return true;
		}
	}
});

}ጉ죀ϝ