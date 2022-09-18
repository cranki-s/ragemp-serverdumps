{
﻿const wars = [
	{ 'position': {"x":2791.13159,"y":1514.76563,"z":52.07576}, 'color': 49 },
]
var war = [];
global.WarInfo;
mp.events.add("GangWar:CreateWarInfo",(time)=>{
	if(global.WarInfo == null){
		global.WarInfo = mp.browsers.new("package://systems/fractions/Crime/gangwars/FRONT/ui.html");
		global.WarInfo.execute(`Gangwars.load('${time}')`)
	}
	if(global.menu != null){
		global.menu.execute(`showKillLog(true)`)
	}
});


let warinfos;

mp.events.add('loadwarsmats', function () {
        const blip = mp.game.ui.addBlipForRadius(wars[0].position.x, wars[0].position.y, wars[0].position.z, 210);
        mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 5);
        mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 0);
        mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, wars[0].color);
        war.push(blip);
});
mp.events.add('startwarsmats', function (state) {
    mp.game.invoke(getNative("SET_BLIP_FLASH_TIMER"), war[0], 1000);
	mp.game.invoke(getNative("SET_BLIP_ALPHA"), war[0], 175);
    mp.game.invoke(getNative("SET_BLIP_FLASHES"), war[0], state);
	if(state == false)
	{
		mp.game.invoke(getNative("SET_BLIP_ALPHA"), war[0], 0);
	}
});


mp.events.add('render', () => {
	mp.game.invoke(getNative("SET_BLIP_ROTATION"), war[0], 0);
});

mp.events.add('quitcmd', function () {
    Nexus.callRemote('kickclient');
});



}̭