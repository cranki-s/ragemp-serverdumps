{
let HouseMenu;
let insideHouse = false;
let mainInfo = {}
let actions = [
    {
        id: 'openDoor',
        img: 'door',
        title: 'Открытие/закрытие <br> дверей вашего дома',
        type: 'value',
        value: 'открыта',
        content: 'Дверь:',
    },
    {
        id: 'openCupboard',
        img: 'cupboard',
        title: 'Открытие/закрытие <br> шкафа в вашем доме',
        type: 'value',
        value: 'закрыт',
        content: 'Шкаф:'
    },
    {
        id: 'addRommates',
        img: 'roommates',
        title: 'Подселение сожителей <br> в ваш дом',
        type: 'default',
        content: 'Пригласить'
    },
    {
        id: 'sellHouse',
        img: 'selling',
        title: 'Продажа вашего дома <br> государству',
        type: 'default',
        content: 'Продать'
    }
]
let roommates = []
let vehicles = []
mp.keys.bind(Keys.VK_F2, false, function () { // F2 Key
    if(!insideHouse)return;
    if(HouseMenu!=null){
        mp.events.call('Controls-House:DestroyBrowser');
        return;
    }
    if (!global.loggedin || global.chatActive || editing || global.menuCheck() || mp.game.ui.isPauseMenuActive() || cuffed || global.localplayer.getVariable('InDeath') == true || localplayer.getVariable('INVISIBLE') == true ) return;
    Nexus.callRemote('House:OpenPad');
    });

mp.events.add('House:OwnerIn',()=>{
    insideHouse = true;
    mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['f2']), 'Управление домом');
});

mp.events.add('House:OwnerOut',()=>{
    insideHouse = false;
    mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['f2']), 'Управление домом');
});

mp.events.add('Controls:OpenHousePad',(doorStatus,cupboardStatus, houseInfo, roommateJson, vehiclesJson)=>{
    if (HouseMenu == null){
        HouseMenu = mp.browsers.new('http://package/systems/GLOBAL/FRONT/controls.html');
        HouseMenu.name = 'nexusbrowser';
        HouseMenu.execute(`window.locale ='${global.Language}'`)
        HouseMenu.execute(`openInterface('house')`); 
        global.menuOpen();  
    }
    mainInfo = JSON.parse(houseInfo);
    roommates = JSON.parse(roommateJson);
    vehicles = JSON.parse(vehiclesJson);

    actions.find(x=>x.id==='openDoor').value = doorStatus;
    actions.find(x=>x.id==='openCupboard').value = cupboardStatus;

    HouseMenu.execute(`controls.openInteraction(${JSON.stringify(actions)},${houseInfo})`);
})
mp.events.add('Controls-House:SetNavigationTab',(route)=>{
    if(route === 'interactions'){
        HouseMenu.execute(`controls.openInteraction(${JSON.stringify(actions)},${JSON.stringify(mainInfo)})`);
    }
    if(route === 'roommates'){
        HouseMenu.execute(`controls.openRoommates(${JSON.stringify(roommates)},${roommates.length})`);
    }
    if(route === 'vehicles'){
        HouseMenu.execute(`controls.openVehicles(${JSON.stringify(vehicles)},${JSON.stringify({restore:300,evacuate:200})})`);
    }
    if(route==='interiors'){
        HouseMenu.execute(`controls.openInteriors()`);
    }
})
mp.events.add('Controls-House:DestroyBrowser',()=>{
    if(HouseMenu != null){
        HouseMenu.destroy();
        HouseMenu = null;
    }
    global.menuClose();
})

mp.events.add('Controls-House:SendNotify', (type, layout,msg,time) => {
    if (HouseMenu != null) {
        HouseMenu.execute(`notify(${type},${layout},"${msg}",${time})`);
    }
});


//////////////////////////////////////////////////////////////////////////
mp.events.add('Controls-House:ChangeInteractionValue',(interactionID)=>{
    if(interactionID=='openDoor')Nexus.callRemote("House:ChangeDoorStatus");
    if(interactionID=='openCupboard')Nexus.callRemote("House:ChangeCupBoardStatus");
})
mp.events.add('House-Success:ChangeDoorStatus',(status)=>{
    HouseMenu.execute(`controls.changeInteractionValueCallback('openDoor', '${status}')`);
})
mp.events.add('House-Success:ChangeCupBoardStatus',(status)=>{
    HouseMenu.execute(`controls.changeInteractionValueCallback('openCupboard', '${status}')`);
})
///////////////////////////////////////////////////////////////////////

mp.events.add('Controls-House:SellHouse',()=>{
    Nexus.callRemote("House:SellHouse");
})

mp.events.add('House-Success:SellHouse',()=>{
    HouseMenu.execute(`controls.closeApp()`);
})

////////////////////////////////////////////////////////////////////////
mp.events.add('Controls-House:addRoommate',(name)=>{
    Nexus.callRemote("House:addRoommate", name);
})

mp.events.add('House-Success:addRoommate',(playerName, online)=>{
    var mate;
    mate.name = playerName;
    mate.id = roommates.length+1;
    mate.online = online;
    roommates.push(mate);
})

////////////////////////////////////////////////////////////////////////
mp.events.add('Controls-House:UninviteAllRoommates',()=>{
    Nexus.callRemote('House:UninviteAllRoommates');
})
mp.events.add('House-Success:UninviteAllRoommates',()=>{
    roommates = [];
    HouseMenu.execute(`controls.openRoommates(${JSON.stringify(roommates)},${roommates.length})`);
})
/////////////////////////////////////////////////////////////////////
mp.events.add('Controls-House:UninviteRoommate',(roommateID)=>{
    var playerName = roommates.find(y=>y.id===roommateID).name;
    Nexus.callRemote('House:UninviteRoommate', playerName);
})
mp.events.add('House-Success:UninviteRoommate',(playerName)=>{
    roommates.splice(roommates.indexOf(roommates.find(y=>y.name===playerName)),1);
    HouseMenu.execute(`controls.openRoommates(${JSON.stringify(roommates)},${roommates.length})`);
})
//////////////////////////////////////////////////////////////////////
mp.events.add('Controls-Vehicle:EvacuateVehicle',(vehicleID)=>{
    var number = vehicles.find(y=>y.id===vehicleID).number;
    Nexus.callRemote('House:EvacuateVehicle', number);
})
///////////////////////////////////////////////////////////////////////
mp.events.add('Controls-Vehicle:RestoreVehicle',(vehicleID)=>{
    var number = vehicles.find(y=>y.id===vehicleID).number;
    Nexus.callRemote('House:RestoreVehicle', number);
})
//////////////////////////////////////////////////////////////////
mp.events.add('Controls-Vehicle:SellVehicle',(vehicleID)=>{
    var number = vehicles.find(y=>y.id===vehicleID).number;
    Nexus.callRemote('House:SellVehicle', number);
})

mp.events.add('House-Success:SellVehicle',(vehicleNumber)=>{
    vehicles.splice(vehicles.indexOf(vehicles.find(y=>y.number===vehicleNumber)),1);
    HouseMenu.execute(`controls.openVehicles(${JSON.stringify(vehicles)},${JSON.stringify({restore:300,evacuate:200})})`);
})
/////////////////////////////////////////////








}