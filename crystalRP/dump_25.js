{
﻿global.showhud = true;
var cruiseSpeed = -1;
var cruiseLastPressed = 0;
var showHint = true;

global.board = mp.browsers.new('package://cef/board.html');

var hudstatus =
{
    safezone: null, // Last safezone size
    online: 0, // Last online int
	reonline: 0,
    street: null,
    area: null,
    invehicle: true,
    updatespeedTimeout: 0, // Timeout for optimization speedometer
    engine: false,
	remen: false,
    doors: true,
    fuel: 0,
    health: 0
}

mp.events.add('playerLeaveVehicle', function () {
	if (global.state === 0) return;
    global.localplayer.setConfigFlag(32, true);
	global.state = 0;
	global.enter = false;
	mp.events.call('notify', 3, 9, "Вы сняли ремень безопасности", 3000);
	mp.events.call("updremen");
});

var typetostring = ["Оповещение", "Ошибка", "Успешно!", "Информация", "Предупреждение" ];
var statustostring = [ "alert", "error", "success", "info", "warning" ];

mp.events.add('notify', (type, layout, msg, time) => {
    if (global.loggedin) {	
		mp.gui.execute(`HUD.showNotify('${typetostring[type]}', '${statustostring[type]}', '${msg}')`);
	}
    else mp.events.call('authNotify', type, layout, msg, time)
});
mp.events.add('showHUD', (show) => {
    global.showhud = show;
    if (!show) mp.gui.execute(`hidehelp(${!showhud})`);
    else if (show && showHint) mp.gui.execute(`hidehelp(${!showhud})`);

    if (show) {
        mp.gui.execute(`HUD.server=${serverid};`);
        mp.gui.execute(`HUD.playerId=${mp.players.local.remoteId}`);
        var playeruid = mp.players.local.getVariable('UID')
		mp.gui.execute(`HUD.UID=${playeruid}`);
    }
    mp.gui.execute(`hidehud(${!showhud})`);
	
    // Update browser safezone
    const safezone = mp.game.graphics.getSafeZoneSize();
    const resolution = mp.game.graphics.getScreenActiveResolution(0, 0);

    mp.gui.execute(`updateSafeZoneSize(${resolution.x}, ${resolution.y}, ${safezone})`);
	
	var minimap = getMinimapAnchor();
    mp.gui.execute(`HUD.minimapFix=${minimap.rightX * 100}`);
	
	var playerId = mp.players.local.getVariable('REMOTE_ID');	
	mp.gui.execute(`HUD.playerId='${playerId}'`);
	var playeruid = mp.players.local.getVariable('UID')
	mp.gui.execute(`HUD.UID=${playeruid}`);
	var personId = mp.players.local.getVariable('PERSON_ID');
	mp.gui.execute(`HUD.personId='${personId}'`);
	
    mp.game.ui.displayAreaName(showhud);
    mp.game.ui.displayRadar(showhud);
    mp.game.ui.displayHud(showhud);
    mp.gui.chat.show(showhud);
});

global.showchat = true;
global.showhelp = true;

global.showveh = true;
global.showpos = true;
global.showeat = true;

mp.events.add('showHUDHELP', () => {
    global.showhelp = !global.showhelp;
	mp.gui.execute(`HUD.showhelp=${global.showhelp}`);
});

mp.events.add('showVEH', () => {
    global.showveh = !global.showveh;
    mp.gui.execute(`HUD.vehs=${global.showveh}`);
});

mp.events.add('showPOS', () => {
    global.showpos = !global.showpos;
    mp.gui.execute(`HUD.poss=${global.showpos}`);
});

mp.events.add('showEAT', () => {
    global.showeat = !global.showeat;
    mp.gui.execute(`HUD.eats=${global.showeat}`);
});

mp.events.add('setbizT', () => {
    mp.gui.execute(`HUD.biz='a'`);
});

mp.events.add('setbizF', () => {
    mp.gui.execute(`HUD.biz='f'`);
});

mp.events.add('showCHAT', () => {
	global.showchat = !global.showchat;
	if (global.menuCheck())
		global.chatWasOpened = showchat;
	else
		mp.gui.chat.show(showchat);
});

mp.events.add('UpdateMoney', function (temp) {
    let money = temp.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
    mp.gui.execute(`HUD.money="${money}"`);
});

mp.events.add('UpdateBank', function (temp) {
    let money = temp.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
    mp.gui.execute(`HUD.bank="${money}"`);
});

mp.events.add('setWanted', function (lvl) {
    mp.game.gameplay.setFakeWantedLevel(lvl);
});

mp.events.add('UpdateFreeCase', function (time) {
    mp.gui.execute(`HUD.freecase="${time}"`);
});

var showHelp = false;
var showHelpF = false;

mp.keys.bind(Keys.VK_F9, false, function () { // F9 key
    if (global.menuOpened) return;
    if (showHelpF) {
        showHelpF = false;
        mp.gui.execute(`HUD.helpActive = false`);
    }
    else {
        showHelpF = true;
        mp.gui.execute(`HUD.helpActive=true`);
    }
});

mp.events.add('setCruiseSpeed', function (speed) {
    speed = parseInt(speed);
    if (speed === NaN || speed < 1) return;
    if (!localplayer.isInAnyVehicle(true) || localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
	let vclass = localplayer.vehicle.getClass();
	if(vclass == 14 || vclass == 15 || vclass == 16) return;
	if(localplayer.vehicle.isOnAllWheels() == false) return;
	var veh = localplayer.vehicle;
    speed = speed / 3.6; // convert from kph to mps
    var maxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(veh.model);
    if (speed > maxSpeed) speed = maxSpeed;
    veh.setMaxSpeed(speed);
    mp.gui.execute(`HUD.cruiseColor='#eebe00'`);
    cruiseSpeed = speed;
});

var passports = {};
mp.events.add('newPassport', function (player, pass) {
    if (player && mp.players.exists(player))
        passports[player.name] = pass;
});

mp.events.add('newFriend', function (player, pass) {
    if (player && mp.players.exists(player)) {
        mp.storage.data.friends[player.name] = true;
        mp.storage.flush();
    }
});

mp.events.add('setQuest', function (quests) {
    mp.gui.execute(`HUD.Quest=${quests}`);
});

var showAltTabHint = false;
mp.events.add('showAltTabHint', function () {
    showAltTabHint = true;
    setTimeout(function () { showAltTabHint = false; }, 10000);
});
mp.events.add('sendRPMessage', (type, msg, players) => {
    var chatcolor = ``;
    players.forEach((id) => {
        var player = mp.players.atRemoteId(id);
        if (mp.players.exists(player)) {
            if (type === "chat" || type === "s") {
                let localPos = localplayer.position;
                let playerPos = player.position;
                let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
                var color = (dist < 2) ? "FFFFFF" :
                    (dist < 4) ? "F7F9F9" :
                        (dist < 6) ? "DEE0E0" :
                            (dist < 8) ? "C5C7C7" : "ACAEAE";
                chatcolor = color;
            }
            var name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true || passports[player.name] != undefined || mp.storage.data.friends[player.name] != undefined) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Гражданин (${id})`;
            msg = msg.replace("{name}", name);
        }
    });
    if (type === "chat" || type === "s")
        msg = `!{#${chatcolor}}${msg}`;
    mp.gui.chat.push(msg);   
});

mp.events.add('onlineud', (maladoy) => {
	setTimeout(() => {
		hudstatus.reonline = maladoy;
	}, 400)
});

mp.events.add('render', (nametags) => {
    if (!global.loggedin) return;   
    mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
    mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
    mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
    mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
    mp.game.ui.hideHudComponentThisFrame(8); // HUD_VEHICLE_CLASS
    mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
    mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
    mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
    mp.game.ui.hideHudComponentThisFrame(22); // MAX_HUD_WEAPONS

    if (hudstatus.online != mp.players.length) {
        hudstatus.online = mp.players.length;
        mp.gui.execute(`HUD.online=${hudstatus.online}`);
    }
    var street = mp.game.pathfind.getStreetNameAtCoord(localplayer.position.x, localplayer.position.y, localplayer.position.z, 0, 0);
    let area  = mp.game.zone.getNameOfZone(localplayer.position.x, localplayer.position.y, localplayer.position.z);
    if(hudstatus.street != street || hudstatus.area != area)
    {
        hudstatus.street = street;
        hudstatus.area = area;  
        mp.gui.execute(`HUD.street='${mp.game.ui.getStreetNameFromHashKey(street.streetName)}'`);
        mp.gui.execute(`HUD.crossingRoad='${mp.game.ui.getLabelText(hudstatus.area)}'`);
    }
    var lastsafezone = mp.game.graphics.getSafeZoneSize();
    if(lastsafezone != hudstatus.safezone) {
        
        hudstatus.safezone = lastsafezone;
        var resolution = mp.game.graphics.getScreenActiveResolution(0,0);
        mp.gui.execute(`updateSafeZoneSize(${resolution.x},${resolution.y},${hudstatus.safezone})`);
    }  
    if (localplayer.isInAnyVehicle(false)) {
		if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			if (!hudstatus.invehicle) 
                mp.gui.execute(`HUD.inVeh=1`);
			hudstatus.invehicle = true;
			var veh = localplayer.vehicle;
			if (veh.getVariable('FUELTANK') !== undefined) {
				let fueltank = veh.getVariable('FUELTANK');
				mp.game.graphics.drawText(`Загружено: ${fueltank}/1000л`, [0.93, 0.80], {
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.4, 0.4],
					outline: true
				});
			}
			if (veh.getVariable('PETROL') !== undefined && veh.getVariable('MAXPETROL') !== undefined) {
				let petrol = veh.getVariable('PETROL');
				let maxpetrol = veh.getVariable('MAXPETROL');
				if (hudstatus.fuel != petrol && petrol >= 0) {
					mp.gui.execute(`HUD.fuel=${petrol}`);
					hudstatus.fuel = petrol;
					if (petrol <= (maxpetrol * 0.2)) ifuel = 0;
					else if (petrol <= (maxpetrol * 0.6)) ifuel = 1;
					else ifuel = 2;
					mp.gui.execute(`HUD.ifuel=${ifuel}`);
				}
			}
            if (veh.getVariable('LOCKED') !== undefined) 
            {
                var locked = veh.getVariable('LOCKED');
				if (hudstatus.doors !== locked) {
					if (locked == true) mp.gui.execute(`HUD.doors=0`);
					else mp.gui.execute(`HUD.doors=1`)
					hudstatus.doors = locked;
				}
			}
			var hp = veh.getEngineHealth() / 10; //getHealth
			hp = hp.toFixed();
			if (hp !== hudstatus.health) {
				mp.gui.execute(`HUD.hp=${hp}`);
				hudstatus.health = hp;
			}
			if (new Date().getTime() - hudstatus.updatespeedTimeout > 50) {
				let speed = (veh.getSpeed() * 3.6).toFixed();
				mp.gui.execute(`HUD.updateSpeed(${speed})`);
                mp.gui.execute(`HUD.rpm=${veh.rpm.toFixed(3)}`);
				hudstatus.updatespeedTimeout = new Date().getTime();
				if (cruiseSpeed != -1) // kostyl'
					veh.setMaxSpeed(cruiseSpeed);
			}
		}
    } 
    else {
        if (hudstatus.invehicle) mp.gui.execute(`HUD.inVeh=0`);
        hudstatus.invehicle = false;
        hudstatus.belt = false;
        mp.gui.execute(`HUD.belt=${hudstatus.belt}`);
    }
});

mp.events.add('playerEnterVehicle', function () {
	setTimeout(() => {
		try{
		    mp.game.audio.setRadioToStationName("OFF");
		    mp.events.call("updengine");
		}
		catch (e) {}
	}, 1000);
	mp.events.call("updlock");	
});

mp.events.add('updengine', function (bool) {
try{
    if (!localplayer.isInAnyVehicle(false)) return;
	var veh = localplayer.vehicle;
	var engine = bool;
	if (bool == undefined)
		engine = veh.getIsEngineRunning();
    if (engine != null && engine !== hudstatus.engine) {
        mp.gui.execute(`HUD.engine=${engine}`);
		hudstatus.engine = engine;
	}
}
catch(e) {}
});

mp.events.add('updremen', function (stat) {
	try{
    var remen = stat;
    if (remen != null && remen !== hudstatus.remen) {
        mp.gui.execute(`HUD.isBelt=${remen}`);
        hudstatus.remen = remen;
    }
	}
	catch(e) {}
});

mp.events.add('updlock', function () {
	try {
	    if (!localplayer.isInAnyVehicle(false)) return;
	    var veh = localplayer.vehicle;
        if (veh.getVariable('LOCKED') !== undefined) 
        {
            var locked = veh.getVariable('LOCKED');          
		    if (hudstatus.doors !== locked) {
			    mp.gui.execute(`HUD.isDoors=${locked}`)
			    hudstatus.doors = locked;
		    }
	    }
	}
	catch(e) {}
});
// Eat && Water
mp.events.add('UpdateEat', function (temp) {
    mp.gui.execute(`HUD.hunger=${temp}`);
});

mp.events.add('UpdateWater', function (temp) {
    mp.gui.execute(`HUD.water=${temp}`);
});
// Demorgan
let Demorgan = false;
mp.events.add('changeTimeDemorgan', (time) => {
    if (Demorgan) {
	    mp.gui.execute(`HUD.changeDemorganTime('${time}')`);
    }
});
mp.events.add('showDemorganMenu', () => {
    if (Demorgan) {
        Demorgan = false;
	    mp.gui.execute(`HUD.DemorganActive = false`);
    }
});
mp.events.add('openDemorgan', (data) => {
    if (!Demorgan) {
        Demorgan = true;
	    mp.gui.execute(`HUD.openDemorganTime(${data})`);
    }
});

}