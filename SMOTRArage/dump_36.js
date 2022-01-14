{
var shopBrowser = false;
var shopsInStream = [];
let inShopData = false;

mp.events.add('playerEnterColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'shop_render') {
				let colData = shape.getVariable('col.data');
				
				let shopMarker = mp.markers.new(1, new mp.Vector3(parseFloat(colData[6]), parseFloat(colData[7]), parseFloat(colData[8])-1), 1.1,
				{
					direction: new mp.Vector3(0, 0, 0),
					rotation: new mp.Vector3(0, 0, 0),
					color: [217, 54, 54, 200],
					visible: true,
					dimension: 0
				});
				
				let shopCheck = mp.checkpoints.new(40, new mp.Vector3(parseFloat(colData[6]), parseFloat(colData[7]), parseFloat(colData[8])), 0.5,
				{
					color: [255, 255, 255, 0],
					visible: true,
					dimension: localPlayer.dimension
				});
				shopCheck.shopData = colData;
				
				let shopArray = {'marker':shopMarker,'check':shopCheck,'data':colData,'alpha':0};
				//let shopArray = {'marker':shopMarker,'data':colData,'alpha':0};
				shopsInStream.push(shopArray);
				return false;
			}
		}
	}
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(mp.checkpoints.exists(checkpoint)) {
		if(typeof(checkpoint.shopData) !== "undefined") {
			let shopData = checkpoint.shopData;
			return enterToShop(shopData);
		}
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(typeof(shape.data) == 'undefined' && typeof(shape.id) != "undefined") {
		if(typeof(shape.getVariable('col.type')) != "undefined") {
			let colType = shape.getVariable('col.type');
			if(colType == 'shop_render') {
				let colData = shape.getVariable('col.data');
				for(var i in shopsInStream) {
					let tempData = shopsInStream[i];
					if(JSON.stringify(colData) == JSON.stringify(tempData.data)) {
						if(tempData['marker']) {
							tempData['marker'].destroy();
							delete tempData['marker'];
						}
						if(tempData['check']) {
							tempData['check'].destroy();
							delete tempData['check'];
						}
						if(shopsInStream[i] || shopsInStream[i] !== undefined) delete shopsInStream[i];
					}
				}
				shopsInStream = shopsInStream.filter(function (el) { return el != null; });
				return false;
			}
		}
	}
});

let shopCam = false;
let targetPart = "body";
let camOffsets = {
	"head": new mp.Vector3(0.0, 0.0, 0.5),
	"body": new mp.Vector3(0.0, 0.0, 0.0),
	"legs": new mp.Vector3(0.0, 0.0, -0.5)
};
let plShopPos = new mp.Vector3(0,0,0);
let camStartPos = new mp.Vector3(0,0,0);
let plHeading = 0;
let distCamToPlayer = 0;

mp.game.streaming.requestAnimDict("mp_character_creation@customise@female_a");

function enterToShop(colData) {
	if(typeof(colData) !== "undefined") {
		ammoInUseCount = parseInt((CryptoJS.AES.decrypt(ammoInUseCount, krKey)).toString(CryptoJS.enc.Utf8));
		if(slotInUse != "0" || ammoInUseCount > 0) {
			if(hud_browser) hud_browser.execute('playSound("noWeapShop", 0.15);');
			ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
			return chatAPI.sysPush("<span style=\"color:#FF6146\"> * С оружием сюда нельзя, уберите оружие.</span>");
		}
		ammoInUseCount = CryptoJS.AES.encrypt((ammoInUseCount).toString(), krKey);
		if(typeof(localPlayer.getVariable("player.money")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин закрыт, приходите позже.. (#1)</span>");
		if(typeof(localPlayer.getVariable("player.bank")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин закрыт, приходите позже.. (#2)</span>");
		if(typeof(localPlayer.getVariable("player.donate")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин закрыт, приходите позже.. (#3)</span>");
		if(typeof(localPlayer.getVariable("player.inv")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин закрыт, приходите позже.. (#4)</span>");
		if(typeof(localPlayer.getVariable("player.pers")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин закрыт, приходите позже.. (#5)</span>");
		if(!shopCam) {
			inShopData = colData;
			
			let shopName = inShopData[3].toString();
			if(shopName == "Военторг « Полицейская форма »") {
				if(typeof(localPlayer.getVariable("player.fraction")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Военторг не доступен, повторите позже..</span>");
				let myFraction = localPlayer.getVariable("player.fraction");
				if(typeof(myFraction.name) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * К военторгу имеют доступ только полицейские</span>");
				if(myFraction.name != "ПОЛИЦИЯ") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * К военторгу имеют доступ только полицейские</span>");
			}else if(shopName == "Магазин инвентаря « Пожарный департамент »") {
				if(typeof(localPlayer.getVariable("player.job")) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин инвентаря не доступен, повторите позже..</span>");
				let myJob = localPlayer.getVariable("player.job");
				if(typeof(myJob.name) === "undefined") return chatAPI.sysPush("<span style=\"color:#FF6146\"> * Магазин инвентаря не доступен, повторите позже..</span>");
				if(myJob.name != "fire") chatAPI.sysPush("<span style=\"color:#FF6146\"> * К этому магазину имеют доступ только пожарники</span>");
			}
			
			mp.events.callRemote('playerEnterShop');
			
			plShopPos = new mp.Vector3(parseFloat(inShopData[9]),parseFloat(inShopData[10]),parseFloat(inShopData[11]));
			camStartPos = new mp.Vector3(parseFloat(inShopData[9]),parseFloat(inShopData[10]),parseFloat(inShopData[11]));
			plHeading = parseFloat(inShopData[12]);
			distCamToPlayer = parseFloat(inShopData[13]);
			
			localPlayer.position = plShopPos;
			localPlayer.setHeading(plHeading);
			localPlayer.freezePosition(true);
			if(mp.game.streaming.hasAnimDictLoaded("mp_character_creation@customise@female_a")) localPlayer.taskPlayAnim("mp_character_creation@customise@female_a", "drop_loop", 8.0, 1.0, -1, 1, 1.0, false, false, false);
			
			targetPart = "body";
			camStartPos.x = plShopPos.x + Math.sin(radians(-plHeading))*2;
			camStartPos.y = plShopPos.y + Math.cos(radians(-plHeading))*2;
			camStartPos.z = camStartPos.z + camOffsets[targetPart].z;
			shopCam = mp.cameras.new('default_shop', new mp.Vector3(camStartPos.x, camStartPos.y, camStartPos.z + camOffsets[targetPart].z-0.2), new mp.Vector3(plShopPos.x, plShopPos.y, plShopPos.z), 40);
			shopCam.setCoord(camStartPos.x, camStartPos.y, camStartPos.z + camOffsets[targetPart].z+0.2);
			shopCam.pointAtCoord(plShopPos.x, plShopPos.y, plShopPos.z + camOffsets[targetPart].z);
			shopCam.setActive(true);
			mp.game.cam.renderScriptCams(true, false, 0, true, false);

			allowBinds = [];
			
			if(hud_browser) {
				hud_browser.destroy();
				hud_browser = null;
			}
			
			hideHud = true;
			mp.game.ui.displayRadar(false);
			if (!shopBrowser) {
				shopBrowser = mp.browsers.new("package://CEF/shop/index.html");
				setTimeout(function() {
					if(shopBrowser) {
						let playerInv = localPlayer.getVariable("player.inv");
						let persData = localPlayer.getVariable("player.pers");
						
						let emptySlots = 0;
						for (let i = 1; i <= 30; i++) {
							if(typeof(playerInv[i.toString()]) === "undefined") emptySlots++;
						}
						
						let catalog = false;
						
						let decShopCatalogs = CryptoJS.AES.decrypt(shopCatalogs, krKey);
						decShopCatalogs = JSON.parse(decShopCatalogs.toString(CryptoJS.enc.Utf8));
						if(typeof(decShopCatalogs[shopName]) !== "undefined") catalog = decShopCatalogs[shopName];
						
						let shopData = {"name":shopName,"gender":persData.npGender,"catalog":catalog,"inv":playerInv,"invSlots":emptySlots,"money":localPlayer.getVariable("player.money"),"bank":localPlayer.getVariable("player.bank"),"donate":localPlayer.getVariable("player.donate")};
						shopBrowser.execute('toggleShop(\''+JSON.stringify(shopData)+'\');');
						mp.gui.cursor.visible = true;
					}
				}, 100);
				allowBinds = [];
			}
		}
	}
}

mp.events.add('shopSetCam', (camID) => {
	if(typeof(camID) !== "undefined") {
		if(shopCam) {
			if(typeof(camOffsets[camID]) !== "undefined") {
				targetPart = camID;
				shopCam.setCoord(camStartPos.x, camStartPos.y, camStartPos.z + camOffsets[targetPart].z+0.2);
				shopCam.pointAtCoord(plShopPos.x, plShopPos.y, plShopPos.z + camOffsets[targetPart].z);
			}
		}
	}
});

mp.events.add('render', () => {
	if(shopCam) {
		if(mp.keys.isDown(37) === true) localPlayer.setHeading(localPlayer.getHeading()+2);
		if(mp.keys.isDown(39) === true) localPlayer.setHeading(localPlayer.getHeading()-2);
	}
});

function exitFromShop() {
	if(inShopData) {
		mp.events.callRemote('playerExitShop');
		
		localPlayer.freezePosition(false);
		localPlayer.clearTasksImmediately();
		localPlayer.position = new mp.Vector3(parseFloat(inShopData[0]),parseFloat(inShopData[1]),parseFloat(inShopData[2]));
		
		restoreBinds();
		
		if(!hud_browser) {
			hud_browser = mp.browsers.new("package://CEF/hud/index.html");
			hud_browser.execute('newcfg(0,0); newcfg(1,0); newcfg(2,0); newcfg(3,1);');
		}
		
		hideHud = false;
		mp.game.ui.displayRadar(true);
		
		if(shopBrowser) {
			shopBrowser.destroy();
			shopBrowser = null;
		}
		
		if(shopCam) {
			shopCam.setActive(false);
			shopCam.detach();
			shopCam.destroy();
			shopCam = null;
			mp.game.cam.renderScriptCams(false, false, 0, false, false);
		}
		
		mp.gui.cursor.visible = false;
		inShopData = false;
	}
}

mp.events.add('exitFromShop', () => {
	exitFromShop();
});

mp.events.add('shopBuy', (basketData) => {
	if(typeof(basketData) !== "undefined") {
		basketData = JSON.parse(basketData);
		let resCost = 0, resDonate = 0;
		
		if(typeof(localPlayer.getVariable("player.money")) === "undefined") return shopBrowser.execute("buyError('Неизвестная ошибка #1');");
		if(typeof(localPlayer.getVariable("player.bank")) === "undefined") return shopBrowser.execute("buyError('Неизвестная ошибка #2');");
		if(typeof(localPlayer.getVariable("player.donate")) === "undefined") return shopBrowser.execute("buyError('Неизвестная ошибка #3');");
		if(typeof(localPlayer.getVariable("player.inv")) === "undefined") return shopBrowser.execute("buyError('Неизвестная ошибка #4');");
		if(typeof(localPlayer.getVariable("player.pers")) === "undefined") return shopBrowser.execute("buyError('Неизвестная ошибка #5');");
		
		let myMoney = parseInt(localPlayer.getVariable("player.money"));
		let myDonate = parseInt(localPlayer.getVariable("player.donate"));
		
		let buyItems = 0;
		for(var k in basketData) {
			buyItems++;
			if(typeof(basketData[k].cost) !== "undefined") resCost = resCost + parseInt(basketData[k].cost);
			if(typeof(basketData[k].donate) !== "undefined") resDonate = resDonate + parseInt(basketData[k].donate);
		}
		
		if(myMoney < resCost) return shopBrowser.execute("buyError('Недостаточно средств для покупки');");
		if(myDonate < resDonate) return shopBrowser.execute("buyError('Недостаточно донат единиц для покупки');");
		
		let playerInv = localPlayer.getVariable("player.inv");
		let emptySlots = 0;
		for (let i = 1; i <= 30; i++) {
			if(typeof(playerInv[i.toString()]) === "undefined") emptySlots++;
		}
		
		if(emptySlots < buyItems) return shopBrowser.execute("buyError('Недостаточно мест в инвентаре');");
		
		shopBrowser.execute("buyingProcessStarted();");
		mp.events.callRemote('shopBuy', JSON.stringify(basketData), resCost.toString(), resDonate.toString());
	}
});

mp.events.add('shopBuyingSuccess', (resCost, resDonate, basketData) => {
	if(typeof(resCost) !== "undefined" && typeof(resDonate) !== "undefined" && typeof(basketData) !== "undefined") {
		exitFromShop();
		basketData = JSON.parse(basketData);
		if(parseInt(resCost) > 0 && parseInt(resDonate) > 0) {
			mp.game.ui.messages.showMidsizedShard("~w~Вы оплатили ~y~покупку ~w~в магазине", "~s~Потрачено"+resCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.~n~Потрачено"+resDonate.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" донат ед.", 5, false, true, 8000);
		}else{
			if(parseInt(resCost) > 0) mp.game.ui.messages.showMidsizedShard("~w~Вы оплатили ~y~покупку ~w~в магазине", "~s~Потрачено"+resCost.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" руб.", 5, false, true, 8000);
			else if(parseInt(resDonate) > 0) mp.game.ui.messages.showMidsizedShard("~w~Вы оплатили ~y~покупку ~w~в магазине", "~s~Потрачено"+resDonate.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")+" донат ед.", 5, false, true, 8000);
		}
	}
});

mp.events.add('shopBuyingError', (errReason) => {
	if(typeof(errReason) !== "undefined") {
		exitFromShop();
		mp.game.ui.messages.showMidsizedShard("~w~Оплата ~r~не ~w~прошла", "~s~"+errReason, 5, false, true, 8000);
	}
});

/*
mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	if(typeof(checkpoint) !== "undefined") {
		if(mp.checkpoints.exists(checkpoint)) {
			if(typeof(checkpoint.shopData) !== "undefined") {
				return enterToShop(checkpoint.shopData);
			}
		}
	}
});
*/
}ᖙླྀȡ