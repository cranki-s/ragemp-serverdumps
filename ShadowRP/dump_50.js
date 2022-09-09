{
global.Falling = false;
mp.events.add('render', () => {
	if (localplayer.getVariable("ShapeBuilderState")) {
		mp.game.controls.disableControlAction(2, 22, true);
		mp.game.controls.disableControlAction(2, 24, true);
		mp.game.controls.disableControlAction(2, 25, true);
		if(!localplayer.isPlayingAnim("anim@heists@box_carry@", "idle", 3)) mp.events.callRemote('serverplayerPlayAnimBuilder')
		if (localplayer.isFalling()) 
		{
			if (global.Falling) return;
			global.Falling = true;
			mp.events.callRemote("serverplayerstopboxBuilder");
		}
		else {
			global.Falling = false;
		}
	}
});
}