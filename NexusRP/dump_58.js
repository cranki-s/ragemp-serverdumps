{
﻿global.showhud = true;
var cruiseSpeed = -1;
var cruiseLastPressed = 0;
var showHint = true;
let fishingState = 0;
let fishingSuccess = 0;
let fishingBarPosition = 0;
let fishingBarMin = 0;
let fishingBarMax = 0;
let movementRight = true;
let fishingAchieveStart = 0;
let intervalFishing;
let isIntervalCreated = false;
let isInZone = false;
let isShowPrompt = false;
let isEnter = false;
let isjoinTable = false;
let playerInGreenZone = false;
var hudstatus =
{
    safezone: null, // Last safezone size,
    online: 0, // Last online int
    belt : false,
    street: null,
    area: null,

    invehicle: false,
    updatespeedTimeout: 0, // Timeout for optimization speedometer
    engine: false,
    doors: true,
    fuel: 0,
    health: 0
}
mp.events.add('Time:PrisonEnable', function (timeonline, reason,isDemorgan,Admin) {
    mp.gui.execute(`HUD.arrest.active=${true}`);
    mp.gui.execute(`HUD.arrest.reason='${reason}'`);
    if(isDemorgan){
        mp.gui.execute(`HUD.arrest.isDemorgan=${isDemorgan}`);
        mp.gui.execute(`HUD.arrest.Admin='${Admin}'`);
    }    
    mp.gui.execute(`HUD.arrest.time='${timeonline}'`);
});
mp.events.add('Time:PrisonDisable', function () {
    mp.gui.execute(`HUD.arrest.active=${false}`);
    mp.gui.execute(`HUD.arrest.time=null`);
    mp.gui.execute(`HUD.arrest.reason=''`);
    mp.gui.execute(`HUD.arrest.isDemorgan=${false}`);
});
mp.events.add('ModuleWrapper.DecisionNotification.Open',(item)=>{
    globalThis.browser.active();
    globalThis.browser.execute(`window.AppData.commit("global/updateModuleWrapper",${item})`);
    
});
mp.events.add('ModuleWrapper.DecisionNotification.Action', (result) => {    
    if (!loggedin || chatActive || editing || global.menuOpened || localplayer.getVariable('seats') == true) return;
    if(result) NexusEvent.callRemote('acceptPressed');
    else NexusEvent.callRemote('cancelPressed');
   // globalThis.browser.execute(`window.RPC.resolve('ModuleWrapper.DecisionNotification.Action', true)`);    
});
mp.events.add('ModuleWrapper.DecisionNotification.Action.Cansel',()=>{        
    globalThis.browser.execute(`window.RPC.resolve('ModuleWrapper.DecisionNotification.Action', ${true})`);
});

mp.events.add('LoadMaterials',()=>{
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    mp.gui.execute(`materialLoad.active = true`);
})
mp.events.add('Callback:LoadMaterials',(events,value)=>{
    if(events && value){
        NexusEvent.callRemote('Materials:Callback',events,value);
    }    
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    mp.gui.execute(`materialLoad.active = false`);
});
mp.events.add('Fish:infishzone',(status)=>{
    mp.gui.execute(`HUD.fishActiveZone = ${status}`)
});
mp.events.add('Fish:ChechWater',()=>{
    if(mp.players.local.isInWater()) return;
    NexusEvent.callRemote('startFish');
});

mp.events.add('CarPrizeTimer.UpdateOnline', (timeonline, type) => {
    var text = timeonline;
    if (text > 0) {
        var hours = Math.floor(text / 60);
        var mins = text % 60;
        text = "";
        if (hours > 0) {
            text = hours + global.GetText(" ч. ");
        }
        text += mins + global.GetText(" мин.")
    }
    let bo = {}
    if (type && !(timeonline == -50 || timeonline == -100)) {
        bo = {
            title: global.GetText('Отыграй 3 часа'),
            subtitle: global.GetText('И получи Free Case'),
            time: text,
            preview: 'free.png'
        };
        mp.gui.execute(`HUD.bonus=${JSON.stringify(bo)}`);
    }
    else if (!type) {
        // if (timeonline == -50 || timeonline == -100) {
        //     text = global.GetText('Вы участвуете')
        // }
        // bo = {
        //     title: global.GetText('Отыграй 50 часов'),
        //     subtitle: global.GetText('Участвуй в розыгрыше'),
        //     subtitle2: global.GetText('одного из Nissan GTR (x5)'),
        //     time: text,
        //     preview: 'gtr.png'
        // };
        // mp.gui.execute(`HUD.bonus2=${JSON.stringify(bo)}`);
    } else {
        mp.gui.execute(`HUD.bonus=false`);
    }
});




// Чтобы замаунтить окно надо вызвать execute на HUD.fisherman.active = true
// Чтобы показать то что рыба нахоиться в detect zone надо вызвать execute на HUD.fisherman.inDetectZone = true

mp.events.add('Hud:OpenFisherman', () => {
    // Open fisherman
    // Вызвать execute на fisherman.hide = false
    // Он должен быть замаунчен!! Иначе высрет аля fisherman ис нот дефаинед
});

let freeze = false;
mp.keys.bind(Keys.VK_X, false, function () { // R key
	try {
		if (!loggedin || chatActive || mp.gui.cursor.visible) return;
        if (mp.players.local.vehicle.getClass() == 14) {
            if(!freeze){
                let speed = (mp.players.local.vehicle.getSpeed() * 3.6).toFixed();
                if(speed>12){
                    mp.events.call('notify', 4, 9, global.GetText("Чтобы бросить якорь нужно остановить судно."), 7000);
                    return;
                }
            }
            freeze = !freeze;
            NexusEvent.callRemote('FreezeBoat',freeze);
        }
	} catch { }
});
// mp.events.addDataHandler('freezestatusboat', function (entity, value) {
//     if (entity.type === "vehicle"){                 
//         entity.freezePosition(value);     
//     }
//   })

mp.events.add('hptohud',(hp,active)=>{
    mp.gui.execute(`HUD.stream=${active}`);
    mp.gui.execute(`HUD.streamerhp=${hp}`);
});




let RentType;
mp.events.add('PopUp:OpenRentMenu',(e,type)=>{
    mp.gui.execute(`popUp.popUpHandler(true, ${e})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    RentType = type;
})
mp.events.add('PopUp:ClosePopUp',()=>{
    mp.gui.execute(`popUp.popUpHandler(false)`);
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    mp.events.call('NPC.cameraOff',1500);
})
mp.events.add('PopUp:CallBack',(payMethod)=>{
    mp.gui.execute(`popUp.popUpHandler(false)`);
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    mp.events.call('NPC.cameraOff',1500);
    NexusEvent.callRemote('RentTransport.Rent', payMethod,RentType); //0 = cash, 1 = bank
})


mp.events.add('safeZoneVisual', function (data) {	  
   mp.gui.execute(`HUD.greenZone=${data}`);
   playerInGreenZone = data;
});



mp.events.add('fishingBaitTaken', () => {
	fishingBarMin = 0.277;
    fishingBarMax = 0.675;
	fishingAchieveStart = Math.random() * 0.39 + fishingBarMin;
    isEnter=true;
    fishingBarPosition = 0.476;
    fishingSuccess = 0;
    fishingState = 3;
});
mp.events.add('Casino.UpdateChips', function (chipsAmount) {
    mp.gui.execute(`HUD.chips=${chipsAmount}`);
});



mp.events.add('Quest.Hud.Update', function (JSONobj) {
    mp.gui.execute(`HUD.currentQuestsHandler('add', ${JSONobj})`);
});

mp.events.add('Quest.Hud.RemoveQuest', function (questId) {
    mp.gui.execute(`HUD.currentQuestsHandler('remove', '${questId}')`);
});

mp.events.add('Quest.PushNotice', (notice)=>{
    mp.gui.execute(`notice.noticeHanlder(${notice}, true)`);
});

mp.events.add('UpdateEat', function (temp, amount) {
    mp.gui.execute(`HUD.eat=${temp}`);
});
mp.events.add('UpdateWater', function (temp, amount) {
    mp.gui.execute(`HUD.water=${temp}`);
});
mp.events.add('LuckyWheel.UpdateOnline', function (timeonline) 
{
    var text = timeonline;
    if(text> 0){
        var hours = Math.floor(text/60);
        var mins = text%60;
        text = "";
        if(hours > 0){
            text = hours + global.GetText(" ч. ");
        }
        text += mins + global.GetText(" мин.")
    }
    mp.gui.execute(`HUD.timeonline="${text}"`);
});
// HUD events
mp.events.add('notify', (type, layout, msg, time) => 
{
    if (global.loggedin) mp.gui.execute(`notify(${type},${layout},"${msg}",${time})`);
    else mp.events.call('authNotify', type, layout, msg, time)
});

mp.events.add('storage', (data) => {
	mp.storage.data.storage = data;
	mp.storage.flush();
});
mp.events.add('Chat:OpenChat',()=>{
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
    mp.gui.execute(`chat.OpenChats()`);
})
mp.events.add('showHUD', (show) => {
    global.showhud = show;
    mp.gui.execute(`HUD.locale='${global.Language}'`);
    if (!show) mp.gui.execute(`hidehelp(${!showhud})`);
    else if (show && showHint) mp.gui.execute(`hidehelp(${!showhud})`);

    // if(show) mp.gui.execute(`logotype.server=${serverid};`);

	// It's execute must be first, 
	// because if this will be after 
	// for example hidehud excecute then storage has been cleared
	//mp.gui.execute(`updateStorage(${JSON.stringify(mp.storage.data.storage)})`);
	// -------------------------------------------------------------------------
    mp.gui.execute(`hidehud(${!showhud})`);
	
    // Update browser safezone
    const safezone = mp.game.graphics.getSafeZoneSize();
    const resolution = mp.game.graphics.getScreenActiveResolution(0, 0);

    mp.gui.execute(`safezoneOurUpdate(${resolution.x}, ${resolution.y}, ${safezone})`);

	var playerId = localplayer.getVariable('REMOTE_ID');
	var uId = localplayer.getVariable('UID');

    mp.gui.execute(`HUD.id='${playerId}'`);
    mp.gui.execute(`HUD.uniqueId='${uId}'`);    
	
    mp.game.ui.displayAreaName(showhud);
    mp.game.ui.displayRadar(showhud);
    mp.game.ui.displayHud(showhud);
    mp.gui.chat.show(showhud);
});

mp.events.add('UpdateMoney', function (temp, amount) {
    mp.gui.execute(`HUD.money=${temp}`);
});

mp.events.add('UpdateBank', function (temp, amount) {
    mp.gui.execute(`HUD.bank=${temp}`);
});

mp.events.add('setWanted', function (lvl) {
   mp.gui.execute(`HUD.setWanted(${parseInt(lvl)})`);
});

mp.keys.bind(Keys.VK_F5, false, function () { // F5 key
    if (global.menuOpened) return;

    if (global.showhud && showHint) {
        showHint = false;
        mp.gui.execute(`hidehelp(${!showHint})`);
    }
    else if (global.showhud) {
        global.showhud = !global.showhud;
        mp.events.call('showHUD', global.showhud);
    }
    else {
        showHint = true;
        mp.gui.execute(`hidehelp(${!showHint})`);
        global.showhud = !global.showhud;
        mp.events.call('showHUD', global.showhud);
    }
});
mp.keys.bind(Keys.VK_J, false, function () { // belt systemif 
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
    if (localplayer.isInAnyVehicle(false)) {
        lastCheck = new Date().getTime();

        if (hudstatus.belt) {
            localplayer.setConfigFlag(32, true);
            mp.events.call('notify', 4, 9, global.GetText("Вы отстегнули ремень безопасности"), 2000);
        }
        else {
            localplayer.setConfigFlag(32, false);
            mp.events.call('notify', 2, 9, global.GetText("Вы пристегнули ремень безопасности"), 2000);
        }

        hudstatus.belt = !hudstatus.belt;
        mp.gui.execute(`HUD.belt=${hudstatus.belt}`);

        var testBelt = localplayer.getConfigFlag(32, true);
        NexusEvent.callRemote('beltCarPressed', testBelt);
    }
});
mp.events.add('ChechBeltStatus', function () {
    if (hudstatus.belt) {
        localplayer.setConfigFlag(32, true);
        mp.events.call('notify', 4, 9, global.GetText("Вы отстегнули ремень безопасности"), 2000);
        hudstatus.belt = false;
        mp.gui.execute(`HUD.belt=${false}`);
    }
});

// CRUISE CONTROL //
/*
mp.keys.bind(Keys.VK_6, false, function () { // 5 key - cruise mode on/off
    if (!loggedin || global.chatActive || editing || global.menuOpened) return;
    if (!localplayer.isInAnyVehicle(true) || localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
	let vclass = localplayer.vehicle.getClass();
	if(vclass == 14 || vclass == 15 || vclass == 16) return;
	if(localplayer.vehicle.isOnAllWheels() == false) return;
    if (new Date().getTime() - cruiseLastPressed < 300) {
        mp.events.call('openInput', 'Круиз-контроль', 'Укажите скорость в км/ч', 3, 'setCruise');
    } else {
        var veh = localplayer.vehicle;
        if (cruiseSpeed == -1) {
            var vspeed = veh.getSpeed();
            if (vspeed > 1) {
                veh.setMaxSpeed(vspeed);
                mp.gui.execute(`HUD.cruiseColor='#eebe00'`);
                cruiseSpeed = vspeed;
            }
        }
        else {
            cruiseSpeed = -1;
            veh.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(veh.model));
            mp.gui.execute(`HUD.cruiseColor='#ffffff'`);
        }
    }
    cruiseLastPressed = new Date().getTime();
});*/



var passports = {};
mp.events.add('newPassport', function (player, pass) {
    if (player && mp.players.exists(player))
        passports[player.name] = pass;
});

var showAltTabHint = false;
mp.events.add('showAltTabHint', function () {
    showAltTabHint = true;
    setTimeout(function () { showAltTabHint = false; }, 10000);
});

mp.events.add('sendRPMessage', (type, msg, players) => {
    var chatcolor = ``;    
    msg = JSON.parse(msg);
    if(players != null &&players != undefined){       
        players.forEach((id) => {
            var player = mp.players.atRemoteId(id);            
            if (mp.players.exists(player)) {
                if (type === "chat" || type === "s") {
                    let localPos = localplayer.position;
                    let playerPos = player.position;
                    let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
                    var color = (dist < 2) ? "#FFFFFF" :
                        (dist < 4) ? "#F7F9F9" :
                            (dist < 6) ? "#DEE0E0" :
                                (dist < 8) ? "#C5C7C7" : "#ACAEAE";
                    msg.color = color;
                }
                var name = "";
                let genderType = (player.getVariable("GENDER")) ? "ець" : "ка";
                if(player.getVariable('IS_MASK') == true) {
                    name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Незнайом${genderType} (${id})`;
                } else {
                    name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true || passports[player.name] != undefined || mp.storage.data.friends[player.name] != undefined) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Незнайом${genderType} (${id})`;
                }            
                msg.message = msg.message.replace("{name}", name);
            }
        });
    }
    //if (type === "chat" || type === "s")    
    mp.gui.execute(`chat.chatPush(${JSON.stringify(msg)})`)
	//mp.gui.chat.push(JSON.stringify(msg));
});

mp.events.add('HUD:BodyCam:Active',(data)=>{
    mp.gui.execute(`HUD.bodyCamActive(${data})`);
});


let sendtoadminchat = true;
mp.events.add('SendToAdminCheats',(message)=>{
   if(sendtoadminchat) mp.gui.chat.push(message);
});
mp.events.add('sendtoadminchat',(anticheats)=>{
    sendtoadminchat = anticheats;
 });
mp.events.add('render', (nametags) => {

    if (!global.loggedin) return;
	
    // Disable HUD components.    
    mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
    mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
    mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
    mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
    mp.game.ui.hideHudComponentThisFrame(8); // HUD_VEHICLE_CLASS
    mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME

    mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
    mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
    mp.game.ui.hideHudComponentThisFrame(22); // MAX_HUD_WEAPONS

    // Update online counter in logotype.
    if (hudstatus.online != mp.players.length) {
        hudstatus.online = mp.players.length;
        mp.gui.execute(`HUD.online=${hudstatus.online}`);
    }

    // Update street & district
    var street = mp.game.pathfind.getStreetNameAtCoord(localplayer.position.x, localplayer.position.y, localplayer.position.z, 0, 0);
    let area  = mp.game.zone.getNameOfZone(localplayer.position.x, localplayer.position.y, localplayer.position.z);
    if(hudstatus.street != street || hudstatus.area != area)
    {
        hudstatus.street = street;
        hudstatus.area = area;   
        
        mp.gui.execute(`HUD.street='${mp.game.ui.getStreetNameFromHashKey(street.streetName)}'`);
        mp.gui.execute(`HUD.crossingRoad='${mp.game.ui.getLabelText(hudstatus.area)}'`);
    }

    if (localplayer.isInAnyVehicle(false)) {

		if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			if (!hudstatus.invehicle){ 
                mp.gui.execute(`HUD.inVeh=1`);
                showNitifyCar(true);
            }
			hudstatus.invehicle = true;

			var veh = localplayer.vehicle;

			// if (veh.getVariable('FUELTANK') !== undefined) {
			// 	let fueltank = veh.getVariable('FUELTANK');
			// 	mp.game.graphics.drawText(`Загружено: ${fueltank}/1000л`, [0.93, 0.80], {
			// 		font: 0,
			// 		color: [255, 255, 255, 185],
			// 		scale: [0.4, 0.4],
			// 		outline: true
			// 	});
			// }
			if (veh.getVariable('PETROL') !== undefined && veh.getVariable('MAXPETROL') !== undefined) {
				let petrol = veh.getVariable('PETROL');
				let maxpetrol = veh.getVariable('MAXPETROL');
				
				let petrolPercent = Math.floor(petrol/maxpetrol*240);
				let fuelStroke = 376 - (petrol * 376 / maxpetrol); // 376 - stroke-dasharray of path element

				if (hudstatus.fuel != petrolPercent && petrolPercent >= 0) {
					mp.gui.execute(`HUD.fuel=${petrol}`);
					mp.gui.execute(`HUD.fuelMax=${maxpetrol}`);
                    mp.gui.execute(`HUD.fuelStroke=${fuelStroke}`);
					hudstatus.fuel = petrolPercent;
					
					if (petrol <= (maxpetrol * 0.2)) ifuel = 0;
					else if (petrol <= (maxpetrol * 0.6)) ifuel = 1;
					else ifuel = 2;
					mp.gui.execute(`HUD.ifuel=${ifuel}`);
				}
			}
            if (mp.players.local.vehicle.getClass() == 14) {
                if(hudstatus.anchor == null || hudstatus.anchor!=freeze){
                    hudstatus.anchor = freeze;

                    if(!hudstatus.anchor) mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['X']),`Бросить якорь`);
                        else mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['X']),`Снять якорь`);
                }
            }

			var engine = veh.getIsEngineRunning();
			if (engine != null && engine !== hudstatus.engine) {
				if (engine == true) mp.gui.execute(`HUD.engine=1`);
				else mp.gui.execute(`HUD.engine=0`);
                if(hudstatus.engine!=engine || hudstatus.engine == null){
                    if(engine) mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['2']),`Заглушить Транспорт`);
                        else mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['2']),`Завести Транспорт`);


                        let vehClass = mp.players.local.vehicle.getClass();
                        if(vehClass == 8 || vehClass == 9 || vehClass == 13 || vehClass == 14 || vehClass == 15 || vehClass == 16 || vehClass == 19 || vehClass == 21) {}
                        else{
                        mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['X']),`Ограничение скорости`);
                        mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['ALT', 'W']),`SOF-езда`);
                        }
                }
				hudstatus.engine = engine;
			}
			
			var temp_light = veh.getLightsState(1, 1);
			if(temp_light.lightsOn>0||temp_light.highbeamsOn>0){
				mp.gui.execute(`HUD.light=true`);
			}else{
				mp.gui.execute(`HUD.light=false`);
			}
			

            if (veh.getVariable('LOCKED') !== undefined) 
            {
                var locked = veh.getVariable('LOCKED');
                
				if (hudstatus.doors !== locked) {
					if (locked == true) { 
						mp.gui.execute(`HUD.doors=0`);
					} else {
						mp.gui.execute(`HUD.doors=1`)
					}
					hudstatus.doors = locked;
				}
			}

			var hp = veh.getHealth() / 10;
			hp = hp.toFixed();
			if (hp !== hudstatus.health) {
				mp.gui.execute(`HUD.hp=${hp}`);
				hudstatus.health = hp;
			}

			if (new Date().getTime() - hudstatus.updatespeedTimeout > 50) {
                let speed = (veh.getSpeed() * 3.6).toFixed();
                mp.gui.execute(`HUD.speed = ${speed}`);
				mp.gui.execute(`HUD.updateSpeed(${speed})`);
				mp.gui.execute(`speedometerUpdate(${speed})`);
				hudstatus.updatespeedTimeout = new Date().getTime();
				//if (cruiseSpeed != -1) // bebra
					//veh.setMaxSpeed(cruiseSpeed);
			}
		}
    } 
    else 
    {
        if (hudstatus.invehicle) {
            mp.gui.execute(`HUD.inVeh=0`);
            mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['2']));
            mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['X']));
            mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['ALT', 'W']));
            showNitifyCar(false);
        }
        hudstatus.invehicle = false;
        hudstatus.engine = null;
        hudstatus.anchor = null;
    }
});



function showNitifyCar(flag){
    if(flag){
        if(localplayer.vehicle.model==3338918751){
            mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['F2']), `Планшет такси`);
        }
        if(localplayer.vehicle.model==1171614426 || mp.players.local.vehicle.model==3770651682 || mp.players.local.vehicle.model==1500677296){
            mp.events.call('Hud.InfoButtons.Add', JSON.stringify(['F2']), `Планшет EMS`);
        }
    }else{
        mp.events.call('Hud.InfoButtons.Remove', JSON.stringify(['F2']));
    }
}

let specialHudKeys = {
    'arrowup':'↑',
    'arrowright':'→',
    'arrowdown':'←',
    'arrowleft':'↓'
}
let defaultPrompts = 
[
    [['tab'],`Показать палец`],
    [['b'],`Микрофон`],
    [['i'],`Инвентарь`],
    [['u'],`Анимации`],
    [['f10'],`Меню игрока`]
]
defaultPrompts = defaultPrompts.sort((prevPrompt,nextPrompt)=>prevPrompt[0].length-nextPrompt[0].length);
let activePrompts = JSON.parse(JSON.stringify(defaultPrompts));
mp.gui.execute(`HUD.promptList = ${JSON.stringify(getBrowserPrompts(activePrompts))}`);

function getBrowserPrompts(promptsList){
    let browserPromptsList = [];
    promptsList.forEach(onePrompt => {
        let keysArr = [];
        onePrompt[0].forEach(promptKey=>{
            if(promptKey.toLowerCase() in specialHudKeys) promptKey = specialHudKeys[promptKey.toLowerCase()];
            promptKey = promptKey.charAt(0).toUpperCase() + promptKey.slice(1);
            keysArr.push(promptKey);
        });
        browserPromptsList.push([keysArr,onePrompt[1]]);
    });
    return browserPromptsList;
}

mp.events.add("Hud.InfoButtons.Add", (newPromptKeys,newPromptText) => 
{
    let newPrompt = [JSON.parse(newPromptKeys),newPromptText];
    if(activePrompts.some(onePrompt=>onePrompt[0].join('+').toLowerCase()===newPrompt[0].join('+').toLowerCase())){
        activePrompts.find(onePrompt=>onePrompt[0].join('+').toLowerCase()===newPrompt[0].join('+').toLowerCase())[1] = newPrompt[1];
    }
    else{
        let availablePrompts = activePrompts.filter(prompt=>prompt[0].length===newPrompt[0].length);
        if(availablePrompts.length!==0){
            let index = activePrompts.indexOf(availablePrompts[availablePrompts.length-1]);
            activePrompts.splice(index+1,0,newPrompt);
        }else{
            activePrompts.push(newPrompt);
        }
    }
    mp.gui.execute(`HUD.promptList = ${JSON.stringify(getBrowserPrompts(activePrompts))}`);
});
mp.events.add("Hud.InfoButtons.Remove", (keysList) => //[key,key]
{
    keysList = JSON.parse(keysList);
    let currentPrompt = activePrompts.find(onePrompt=>onePrompt[0].join('+').toLowerCase()==keysList.join('+').toLowerCase());
    if(currentPrompt){
        if(defaultPrompts.some(onePrompt=>onePrompt[0].join('+').toLowerCase()===keysList.join('+').toLowerCase())){
            let newPrompt = defaultPrompts.find(onePrompt=>onePrompt[0].join('+').toLowerCase()===keysList.join('+').toLowerCase());
            let index = activePrompts.indexOf(currentPrompt);
            currentPrompt = JSON.parse(JSON.stringify(newPrompt));
            activePrompts.splice(index,1,currentPrompt);
        }else{
            let index = activePrompts.indexOf(currentPrompt);
            activePrompts.splice(index,1);
        }
    }
    mp.gui.execute(`HUD.promptList = ${JSON.stringify(getBrowserPrompts(activePrompts))}`);
});
mp.events.add("Hud.InfoButtons.SetDefault", () => 
{
    activePrompts = JSON.parse(JSON.stringify(defaultPrompts));
    mp.gui.execute(`HUD.promptList = ${JSON.stringify(getBrowserPrompts(activePrompts))}`);
});
}