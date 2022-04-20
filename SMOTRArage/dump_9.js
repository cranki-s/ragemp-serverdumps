{
var casinoAntiFlood = false;

var casinoBrowser = null;
var inCasino = false;
var afChipsPanel = false;
var activeCASINOoperation = false;
if(!mp.game.streaming.isIplActive("vw_casino_main")) mp.game.streaming.requestIpl("vw_casino_main");

mp.game.ui.registerNamedRendertarget("casinoscreen_01", false);
mp.game.ui.linkNamedRendertarget(mp.game.joaat('vw_vwint01_video_overlay'));
let targetCasinoId = mp.game.ui.getNamedRendertargetRenderId("casinoscreen_01");
if(!mp.game.graphics.hasStreamedTextureDictLoaded('Prop_Screen_Vinewood')) mp.game.graphics.requestStreamedTextureDict('Prop_Screen_Vinewood', false);
mp.game.invoke('0xF7B38B8305F1FE8B', 0, "CASINO_DIA_PL", 1);
mp.game.graphics.setTvAudioFrontend(true);
mp.game.graphics.setTvVolume(-100);
mp.game.graphics.setTvChannel(-1);

let rot = 0;

mp.game.entity.createModelHideExcludingScriptObjects(1100.0177001953125, 220.02122497558594, -49.989967346191406, 10.0, 2733879850, true);
let podium = mp.objects.new(2733879850, new mp.Vector3(1100.0177001953125, 220.02122497558594, -49.989967346191406));

var casinoVeh = null, rotatePodiumColshape = mp.colshapes.newSphere(1100.0177001953125, 220.02122497558594, -49.989967346191406, 80.0), cashierColshape = null, cashierMarker = null;

// {"x":-433.5053,"y":-2187.8091,"z":10.1905} -- Вход в казик

//veh.doNotChangeAlpha = true;

mp.events.add("worldDataChanged", (key, oldValue, newValue) => {
	if(key == "casino") {
		if(mp.vehicles.exists(casinoVeh)) casinoVeh.destroy();
		
		if(typeof(mp.world.data) !== "undefined") {
			if(typeof(mp.world.data.casino) !== "undefined") {
				if(typeof(mp.world.data.casino.todayCar) !== "undefined") {
					casinoVeh = mp.vehicles.new(mp.game.joaat(mp.world.data.casino.todayCar), new mp.Vector3(1100.0177001953125, 220.02122497558594, -48.85), {
						color: [[215, 5, 7],[255,0,0]],
						locked: true
					});
				}
			}
		}
	}
});

mp.events.add("playerEnterColshape", (shape) => {
	if(typeof(shape) !== "undefined" && typeof(rotatePodiumColshape) !== "undefined" && typeof(cashierColshape) !== "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(mp.colshapes.exists(rotatePodiumColshape)) {
				if(shape == rotatePodiumColshape) {
					if(mp.vehicles.exists(casinoVeh)) casinoVeh.destroy();
					if(mp.colshapes.exists(cashierColshape)) cashierColshape.destroy();
					if(mp.markers.exists(cashierMarker)) cashierMarker.destroy();
					
					if(typeof(mp.world.data) !== "undefined") {
						if(typeof(mp.world.data.casino) !== "undefined") {
							if(typeof(mp.world.data.casino.todayCar) !== "undefined") {
								casinoVeh = mp.vehicles.new(mp.game.joaat(mp.world.data.casino.todayCar), new mp.Vector3(1100.0177001953125, 220.02122497558594, -48.85), {
									color: [[215, 5, 7],[255,0,0]],
									locked: true
								});
							}
						}
					}

					cashierColshape = mp.colshapes.newSphere(1115.4155, 219.9362, -49.4351, 1.0)
					cashierMarker = mp.markers.new(1, new mp.Vector3(1115.4155, 219.9362, -49.4351-1), 1.1,
					{
						direction: new mp.Vector3(0, 0, 0),
						rotation: new mp.Vector3(0, 0, 0),
						color: [217, 54, 54, 200],
						visible: true,
						dimension: 0
					});
					
					
					inCasino = {"gameType":false,"gameName":false};
					mp.game.graphics.setTvChannel(0);
					mp.events.add("render", rotateVehAndPlayTV);
					
					if(vehPanel) closeVehMenu();
					if(inventoryPanel) closeInventory();
				}
			}
			if(mp.colshapes.exists(cashierColshape)) {
				if(shape == cashierColshape) {
					if(typeof(localPlayer.getVariable('player.id')) !== "undefined" && typeof(localPlayer.getVariable('player.money')) !== "undefined" && typeof(localPlayer.getVariable('player.chips')) !== "undefined" && !localPlayer.vehicle && hud_browser) {
						if(!casinoBrowser) {
							if(activeCASINOoperation) return false;
							//return chatAPI.notifyPush(" * Донат баланс <span style=\"color:#FEBC00\"><b>"+localPlayer.getVariable('player.donate')+"</b></span>.");
							localPlayer.freezePosition(true);
							casinoBrowser = mp.browsers.new("package://CEF/casino/index.html");
							setTimeout(function() {
								if(casinoBrowser) {
									allowBinds = [];
									casinoBrowser.execute("initCasinoData("+localPlayer.getVariable('player.id')+", '"+localPlayer.getVariable('player.nick')+"', "+localPlayer.getVariable('player.money')+", "+localPlayer.getVariable('player.chips')+");");
									mp.gui.cursor.visible = true;
								}
							}, 100);
						}
					}
				}
			}
		}
	}
});

mp.events.add("playerExitColshape", (shape) => {
	if(typeof(shape) !== "undefined" && typeof(rotatePodiumColshape) !== "undefined" && typeof(cashierColshape) !== "undefined") {
		if(mp.colshapes.exists(shape)) {
			if(mp.colshapes.exists(rotatePodiumColshape)) {
				if(shape == rotatePodiumColshape) {
					if(mp.vehicles.exists(casinoVeh)) casinoVeh.destroy();
					if(mp.colshapes.exists(cashierColshape)) cashierColshape.destroy();
					if(mp.markers.exists(cashierMarker)) cashierMarker.destroy();
					
					inCasino = false;
					mp.game.graphics.setTvChannel(-1);
					mp.events.remove("render", rotateVehAndPlayTV);
				}
			}
			if(mp.colshapes.exists(cashierColshape)) {
				if(shape == cashierColshape) {
					if(casinoBrowser) {
						exitCasinoPanel();
					}
				}
			}
		}
	}
});

function exitCasinoPanel() {
	if(casinoBrowser) {
		restoreBinds();
		casinoBrowser.destroy();
		casinoBrowser = null;
		mp.gui.cursor.visible = false;
		localPlayer.freezePosition(false);
	}
}
mp.events.add("exitCasinoPanel", exitCasinoPanel);

function buyChips(chipsVal) {
	if(casinoBrowser) {
		if(activeCASINOoperation) return casinoBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afChipsPanel) return casinoBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(typeof(chipsVal) !== "undefined") {
			chipsVal = parseInt(chipsVal);
			let playerMoney = parseInt(localPlayer.getVariable('player.money'));
			let playerChips = parseInt(localPlayer.getVariable('player.chips'));
			
			let chipsCost = chipsVal*10;
			
			if(playerMoney < chipsCost) {
				return casinoBrowser.execute("msg_error('Недостаточно средств для покупки');");
			}else{
				if(chipsVal < 1000) return casinoBrowser.execute("msg_error('Купить можно от <b>1 000</b> фиш.');");
				if(chipsVal > 9999999) return casinoBrowser.execute("msg_error('Купить можно до <b>9 999 999</b> фиш. за раз');");
				afChipsPanel = true;
				setTimeout(function() { afChipsPanel = false }, 5000);
				activeCASINOoperation = true;
				mp.events.callRemote('buyChips', roundNumber(chipsVal, 0));
			}
		}
	}
}
mp.events.add("buyChips", buyChips);

function sellChips(chipsVal) {
	if(casinoBrowser) {
		if(activeCASINOoperation) return casinoBrowser.execute("msg_error('У Вас есть не завершённые операции, подождите..');");
		if(afChipsPanel) return casinoBrowser.execute("msg_error('Слишком частые операции, подождите 5 секунд.');");
		if(typeof(chipsVal) !== "undefined") {
			chipsVal = parseInt(chipsVal);
			let playerMoney = parseInt(localPlayer.getVariable('player.money'));
			let playerChips = parseInt(localPlayer.getVariable('player.chips'));
			
			if(playerChips < chipsVal) {
				return casinoBrowser.execute("msg_error('У Вас нет столько фишек для продажи');");
			}else{
				if(chipsVal < 100) return casinoBrowser.execute("msg_error('Продать можно от <b>100</b> фиш.');");
				if(chipsVal > 9999999) return casinoBrowser.execute("msg_error('Продать можно до <b>9 999 999</b> фиш. за раз');");
				afChipsPanel = true;
				setTimeout(function() { afChipsPanel = false }, 5000);
				activeCASINOoperation = true;
				mp.events.callRemote('sellChips', roundNumber(chipsVal, 0));
			}
		}
	}
}
mp.events.add("sellChips", sellChips);

function casinoOperationFailed() {
	if(atmBrowser) mp.events.call("exitCasinoPanel");
	activeCASINOoperation = false;
	return notyAPI.error("Служба безопасности казино отменила сделку.", 3000, true);
}
mp.events.add("casinoOperationFailed", casinoOperationFailed);

function casinoUpdated(newMoney, newChips) {
	if(casinoBrowser && typeof(newMoney) !== "undefined" && typeof(newChips) !== "undefined") {
		casinoBrowser.execute("casinoUpdated('"+newMoney+"', '"+newChips+"');");
	}
	activeCASINOoperation = false;
}
mp.events.add("casinoUpdated", casinoUpdated);

function rotateVehAndPlayTV() {
	if(typeof(targetCasinoId) !== "undefined") {
		mp.game.ui.setTextRenderId(targetCasinoId);
		mp.game.graphics.set2dLayer(4);
		mp.game.invoke('0xC6372ECD45D73BCD', 1);
		mp.game.invoke('0x2BC54A8188768488', 'Prop_Screen_Vinewood', 'BG_Wall_Colour_4x4', 0.25, 0.5, 0.5, 1, 0, 255, 255, 255, 255);
		mp.game.graphics.drawTvChannel(0.5, 0.5, 1, 1, 0, 255, 255, 255, 255);
		mp.game.ui.setTextRenderId(1);
	}
	
	if(mp.vehicles.exists(casinoVeh)) {
		if(podium.isOnScreen() && casinoVeh.isOnScreen()) {
			rot+=0.05;
			if(rot >= 360) rot = 0;
			casinoVeh.position = new mp.Vector3(1100.0177001953125, 220.02122497558594, casinoVeh.position.z);
			podium.rotation = new mp.Vector3(0, 0, rot);
			casinoVeh.setHeading(rot);
		}
	}
}
}ĩ