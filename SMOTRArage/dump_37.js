{
var playerPedPreview = null;

function enablePedScreen() {
	if(!playerPedPreview) {
		let myPos = localPlayer.position;
		
		let pedModel = false;
		if(typeof(localPlayer.getVariable("player.pers")) !== 'undefined') {
			let persData = localPlayer.getVariable("player.pers");
			if(IsJsonString(JSON.stringify(persData))) {
				if(persData.npGender == "male") pedModel = "mp_m_freemode_01"; // Посан
				else pedModel = "mp_f_freemode_01"; // Тёлочка
			}
		}
		
		if(pedModel) {
			playerPedPreview = mp.peds.new(mp.game.joaat(pedModel), new mp.Vector3(myPos.x,myPos.y,myPos.z+70), 0);
			mp.game.ui.setFrontendActive(true);
			mp.game.ui.activateFrontendMenu(mp.game.gameplay.getHashKey("FE_MENU_VERSION_JOINING_SCREEN"), false, -1);
			mp.game.wait(200);
			localPlayer.cloneToTarget(playerPedPreview.handle);
			//mp.gui.cursor.visible = false;
			
			//playerPedPreview = mp.game.invoke('0xEF29A16337FACADB', localPlayer.handle, localPlayer.getHeading(), true, false);
			
			mp.game.invoke('0xF1CA12B18AEF5298', playerPedPreview.handle, false); //NetworkSetEntityInvisibleToNetwork
			let ped = mp.game.invoke('0xAC0BFBDC3BE00E14', playerPedPreview.handle, 1); //GIVE_PED_TO_PAUSE_MENU
			mp.game.invoke('0x3CA6050692BC61B0', true); //SetPauseMenuPedLighting
			mp.game.invoke('0x98215325A695E78A', false); //mouse
			
			setTimeout(() => {
				if(mp.peds.exists(playerPedPreview)) {
					if(playerPedPreview.handle != 0) {
						mp.game.invoke('0xECF128344E9FF9F1', true); //SetPauseMenuPedSleepState
					}
				}
			}, 500);
			
			mp.game.invoke('0xC6372ECD45D73BCD', true); //SetScriptGfxDrawBehindPausemenu
			
			//chatAPI.sysPush("<span style=\"color:#FF6146;\"> * Handle: "+playerPedPreview.handle+".</span>");
			
			/*setTimeout(() => {
				mp.game.invoke('0x6D3465A73092F0E6');
				mp.game.invoke('0xDF47FC56C71569CF', false); //SetPauseMenuActive
			}, 5000);*/
			
			mp.game.invoke('0x31B73D1EA9F01DA2');
			if(hud_browser) hud_browser.active = true;
		}
	}
}

mp.events.add('render', () => {
	if(playerPedPreview) {
		if(playerPedPreview.handle != 0) mp.game.ui.hideHudComponentThisFrame(17);
	}
});

function refreshPedScreen() {
	if(mp.peds.exists(playerPedPreview)) {
		localPlayer.cloneToTarget(playerPedPreview.handle);
	}
}

function deletePedScreen() {
	mp.game.ui.setFrontendActive(false);
	if(mp.peds.exists(playerPedPreview)) playerPedPreview.destroy();
	playerPedPreview = null;
	mp.game.invoke('0xC6372ECD45D73BCD', false); //SetScriptGfxDrawBehindPausemenu
}
}Ω