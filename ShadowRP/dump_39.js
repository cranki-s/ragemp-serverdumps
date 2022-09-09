{
let infoped = null

mp.events.add('OpenMenuHij', () => {
    if (infoped == null) {
        infoped = mp.browsers.new("http://package/browser/modules/Hijacking/index.html")
        mp.gui.cursor.show(true, true)
		infoped.active = true
    } else if (infoped.active == false){
        infoped.active = true
        mp.gui.cursor.show(false, false)
    }
})

mp.events.add('CloseMenuHij', () => {
    infoped.active = false
    mp.gui.cursor.show(false, false)
})

mp.events.add('BlipsHijacking', function (state, pos) {
	if (state) {
	   const blip = mp.game.ui.addBlipForRadius(pos.x, pos.y, pos.z, 500);
	   mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 4);
	   mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 255);
	   mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, 47);
	   blips2 = blip;
	}
	else {
		mp.game.invoke(getNative("SET_BLIP_ALPHA"), blips2, 0);
	}
});		

mp.events.add('camerhijacking', () =>  {
	mp.events.call('showHUD', false);
	HijCam = mp.cameras.new('default', new mp.Vector3(1513.2386, 6373.217, 36.761738), new mp.Vector3(0,0,0), 45);
	HijCam.setRot(-10, 0.0, 180.0, 2);
	HijCam.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 0, true, true);
  });
mp.events.add('exitcamerahij', () =>  {
	HijCam.destroy(true);
	mp.events.call('showHUD', true);
	HijCam = null;
	mp.game.cam.renderScriptCams(false, true, 0, true, false);
  });
}