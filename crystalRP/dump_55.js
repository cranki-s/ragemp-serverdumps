{
var DiverBlip = null;
mp.events.add('DiverBlip', function (state, pos) {
	if (state) {
	   const blip = mp.game.ui.addBlipForRadius(pos.x, pos.y, pos.z, 10);
	   mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 4);
	   mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 255);
	   mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, 47);
	   DiverBlip = blip;
	}
	else {
		mp.game.invoke(getNative("SET_BLIP_ALPHA"), DiverBlip, 0);
	}
});	

var player = mp.players.local;
mp.events.add("StartDiving", () => {
    player.setMaxTimeUnderwater(1000);
});
mp.events.add("StopDiving", () => {
    player.setMaxTimeUnderwater(10);
});
}