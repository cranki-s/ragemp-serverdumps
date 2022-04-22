{
mp.events.add('playerWeaponShot', () => {
    if (mp.players.local.getVariable('allowRecoil') == true) {
        const campos = mp.game.cam.getGameplayCamRot(0);
        mp.game.cam.setGameplayCamRelativePitch(campos.x + 0.8, 0.8);
    }
});
    

mp.events.add('spawnProtection', () => {
	localPlayer.setInvincible(true);
	setTimeout(() => {
		localPlayer.setInvincible(false);
	}, 2500);
});
}