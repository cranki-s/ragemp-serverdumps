{
﻿const wars = [
	{ 'position': {"x":2686.13159,"y":1365.76563,"z":52.07576}, 'color': 49 },
];
var war = [];
let width = 3;
let height = 5;

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

let blipArray = [];

mp.events.add('loadwarsmats', function () {
		for(let i = 0; i < width; i++)
			for(let j = 0; j < height; j++){
				let blip = mp.game.ui.addBlipForRadius(wars[0].position.x + (i*79.8), wars[0].position.y + (j*79.8), wars[0].position.z, 40);
				mp.game.invoke(getNative("SET_BLIP_SPRITE"), blip, 5);
				mp.game.invoke(getNative("SET_BLIP_ALPHA"), blip, 0);
				mp.game.invoke(getNative("SET_BLIP_COLOUR"), blip, wars[0].color);
				war.push(blip);
			}
        
});
mp.events.add('startwarsmats', function (state) {
	war.forEach(element => {
		mp.game.invoke(getNative("SET_BLIP_FLASH_TIMER"), element, 1000);
		mp.game.invoke(getNative("SET_BLIP_ALPHA"), element, 175);
		mp.game.invoke(getNative("SET_BLIP_FLASHES"), element, state);
		if(state == false)
		{
			mp.game.invoke(getNative("SET_BLIP_ALPHA"), element, 0);
		}
	});
    
});


mp.events.add('render', () => {
	war.forEach(element => {
		mp.game.invoke(getNative("SET_BLIP_ROTATION"), element, 0);
	});
});

mp.events.add('quitcmd', function () {
    NexusEvent.callRemote('kickclient');
});



}