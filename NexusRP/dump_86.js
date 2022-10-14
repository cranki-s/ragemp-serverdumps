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
    NewEvent.callRemote('kickclient');
});



}e":"Гетра","Variation":169,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":14700,"id":69,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Разноцветная полумаска","Variation":178,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"price":54200,"id":70,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска черепахи","Variation":181,"color":[0,1,2,3],"price":25100,"id":71,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска мышки","Variation":182,"color":[0,1,2,3],"price":25300,"id":72,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска с сотами","Variation":183,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"price":23200,"id":73,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска гиены","Variation":184,"color":[0,1,2,3],"price":25500,"id":74,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска Trickster","Variation":186,"color":[0,1,2,3,4,5,6,7,8],"price":19800,"id":75,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Гетра с узором","Variation":187,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":14700,"id":76,"modifications":[{"id":0,"name":"0"}]},
    {"name":"Маска чайки","Variation":197,"color":[0,1,2,3],"price":21700,"id":77,"modifications":[{"id":0,"name":"0"}]},



{"name":"Маска свиньи","Variation":1,"color":[0,1,2,3],"price":14300,"id":0,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска черепа","Variation":2,"color":[0,1,2,3],"price":14300,"id":1,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска обезьяны","Variation":3,"color":[0],"price":14800,"id":2,"modifications":[{"id":0,"name":"0"}]},
{"name":"Хоккейная","Variation":4,"color":[0,1,2,3],"price":8800,"id":3,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска доброй обезьяны","Variation":5,"color":[0,1,2,3],"price":14300,"id":4,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маскарадная маска","Variation":6,"color":[0,1,2,3],"price":7700,"id":5,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска гоблина","Variation":7,"color":[0,1,2,3],"price":14500,"id":6,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Маска кота","Variation":17,"color":[0,1],"price":14850,"id":7,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска лисы","Variation":18,"color":[0,1],"price":14300,"id":8,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска совы","Variation":19,"color":[0,1],"price":15400,"id":9,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска енота","Variation":20,"color":[0,1],"price":15400,"id":10,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"}]},
{"name":"Маска Аниме","Variation":44,"color":[0],"price":9900,"id":11,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска со шляпой","Variation":45,"color":[0],"price":8800,"id":12,"modifications":[{"id":0,"name":"0"}]},
{"name":"Завернутый в ленту","Variation":47,"color":[0,1,2,3],"price":6600,"id":13,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"}]},
{"name":"Пакет","Variation":49,"color":[0,1,2,3,4,5,6,7,8,9],"price":5500,"id":14,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Бандана обычная","Variation":51,"color":[0,1,2,3,4,5,6,7,8,9],"price":4950,"id":15,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Балаклава","Variation":52,"color":[0,1,2,3,4,5,6,7,8,9],"price":36630,"id":16,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Маска с капюшоном","Variation":53,"color":[0,1,2,3,4,5,6,7,8],"price":7150,"id":17,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"}]},
{"name":"Маска злой печеньки","Variation":74,"color":[0,1,2],"price":10450,"id":18,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"}]},
{"name":"Намордник","Variation":101,"color":[0,1,2,3,4,5,6,7,8,9],"price":16500,"id":19,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Бандана с узорами","Variation":111,"color":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"price":7700,"id":20,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"},{"id":10,"name":"10"},{"id":11,"name":"11"},{"id":12,"name":"12"},{"id":13,"name":"13"},{"id":14,"name":"14"},{"id":15,"name":"15"},{"id":16,"name":"16"},{"id":17,"name":"17"},{"id":18,"name":"18"},{"id":19,"name":"19"},{"id":20,"name":"20"},{"id":21,"name":"21"},{"id":22,"name":"22"},{"id":23,"name":"23"},{"id":24,"name":"24"},{"id":25,"name":"25"}]},
{"name":"Маска с узорами","Variation":113,"color":[0,1,2,3,4,5,6,7,8,9],"price":7700,"id":21,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Тканевая с узорами","Variation":118,"color":[0,1,2,3,4,5,6,7,8,9],"price":9900,"id":22,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Маска модника","Variation":133,"color":[0,1,2,3,4,5,6,7,8,9],"price":33000,"id":23,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"},{"id":8,"name":"8"},{"id":9,"name":"9"}]},
{"name":"Маска виноград","Variation":151,"color":[0],"price":45500,"id":24,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска ананас","Variation":152,"color":[0],"price":45500,"id":25,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска вишенька","Variation":153,"color":[0],"price":45500,"id":26,"modifications":[{"id":0,"name":"0"}]},
{"name":"Маска эмодзи","Variation":179,"color":[0,1,2,3,4,5,6,7],"price":22000,"id":27,"modifications":[{"id":0,"name":"0"},{"id":1,"name":"1"},{"id":2,"name":"2"},{"id":3,"name":"3"},{"id":4,"name":"4"},{"id":5,"name":"5"},{"id":6,"name":"6"},{"id":7,"name":"7"}]},
{"name":"Маска король обезьян","Variation":147,"color":[0],"price":300000,"id":28,"modifications":[{"id":0,"name":"0"}]}

]`);
    



}