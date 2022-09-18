{
let realtorMenu = global.ConstrolsBrowser;

let housesTypes = [
    {
        id:'Trailer',
        stars:1,
        prices:{
            min:25000,
            max:30000,
        },
        humans:1
    },
    {
        id:'Econom',
        stars:1,
        prices:{
            min:60000,
            max:100000,
        },
        humans:2
    },
    {
        id:'Econom+',
        stars:2,
        prices:{
            min:120000,
            max:180000,
        },
        humans:3
    },
    {
        id:'Comfort',
        stars:2,
        prices:{
            min:390000,
            max:500000,
        },
        humans:4
    },
    {
        id:'Comfort+',
        stars:3,
        prices:{
            min:780000,
            max:850000,
        },
        humans:5
    },
    {
        id:'Premium',
        stars:3,
        prices:{
            min:1000000,
            max:3000000,
        },
        humans:6
    },
    {
        id:'Premium+',
        stars:3,
        prices:{
            min:8000000,
            max:10000000,
        },
        humans:7
    }
]

mp.events.add('Reality:OpenMenu',()=>
{
	if (!global.loggedin || global.chatActive || editing || global.menuCheck() || mp.game.ui.isPauseMenuActive() || cuffed || global.localplayer.getVariable('InDeath') == true || localplayer.getVariable('INVISIBLE') == true ) return;
    realtorMenu.execute(`window.locale ='${global.Language}'`)
    realtorMenu.execute(`openInterface('reality')`);
    realtorMenu.execute(`controls.openReality(${JSON.stringify(housesTypes)})`);	
	global.menuOpen();
    mp.events.call("NPC.cameraOn", "RealtorMenu", 1500);
})
mp.events.add('Reality:DestroyBrowser',()=>
{
	if(realtorMenu !=null){
		realtorMenu.execute(`closeInterface()`);
	}
	global.menuClose();
    mp.events.call('NPC.cameraOff',1500);
})

mp.events.add('Reality:SearchReality',(houseID)=>{
    Nexus.callRemote("LoadHouseToMenu",houseID);
})
mp.events.add('Reality:SearchRealityCallBack',(houseID,houses)=>{

	houses = JSON.parse(houses);
	houses.forEach(e => {
		var street = mp.game.pathfind.getStreetNameAtCoord(e.x, e.y, e.z, 0, 0);
		let areahouse  = mp.game.zone.getNameOfZone(e.x, e.y, e.z);
		e.location = mp.game.ui.getLabelText(areahouse);
		e.street = mp.game.ui.getStreetNameFromHashKey(street.streetName);
	});
	realtorMenu.execute(`controls.searchRealityCallback('${houseID}',${JSON.stringify(houses)})`);
})
mp.events.add('Reality:GetHouseInfo',(house)=>{
    Nexus.callRemote('Reality:GetHouseInfo',house);
})
mp.events.add('Reality:GetHouseInfoCallBack',(house)=>{
	realtorMenu.execute(`controls.getHouseInfoCallback(${house})`);
})
mp.events.add('Reality:GetDirections',(house)=>{
	Nexus.callRemote('Reality:GetDirections',house);
})
}