{
﻿global.showhud = true;
var cruiseSpeed = -1;
var cruiseLastPressed = 0;
var showHint = true;
global.rgb = { r: 217, g: 207, b: 255};
mp.game.invoke('0xF314CF4F0211894E', 143, rgb.r, rgb.g, rgb.b, 255);
mp.game.ui.setHudColour(142, rgb.r, rgb.g, rgb.b, 255);

for (let i = 18; i < 19; i++) {
   mp.game.ui.setHudColour(i, rgb.r, rgb.g, rgb.b, 255);
}
for (let i = 9; i < 10; i++) {
   mp.game.ui.setHudColour(i, 200, 200, 200, 255);
}


var hudstatus =
{
    safezone: null, // Last safezone size
    online: 0, // Last online int

    street: null,
    area: null,

    invehicle: false,
    updatespeedTimeout: 0, // Timeout for optimization speedometer
    engine: false,
    belt: false,
    doors: true,
    fuel: 0,
	inBoat: false,
    health: 0
}

// fishing
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

mp.events.add('fishingBaitTaken', () => {
	fishingBarMin = 0.277;
    fishingBarMax = 0.675;
	fishingAchieveStart = Math.random() * 0.39 + fishingBarMin;
    isEnter=true;
    fishingBarPosition = 0.476;
    fishingSuccess = 0;
    fishingState = 3;
});

mp.events.add('client::walkieHUD', (a,b) => {
	mp.gui.execute(`HUD.walkieadd(${JSON.stringify(a)},${JSON.stringify(b)})`);
});

mp.events.add('client::walkieHUDremove', (a,b) => {
	mp.gui.execute(`HUD.removewalkie(${JSON.stringify(a)},${JSON.stringify(b)})`);
});

function drawFishingMinigame() {

    if(mp.game.controls.isControlPressed(0, 24) && mp.game.controls.isControlJustPressed(0, 24)) {
         switch(fishingState) {
         case 2:
             fishingState = -1;
             mp.events.callRemote('stopFishDrop');
             isEnter=false;
             break;
         case 3:
             if(fishingBarPosition > fishingAchieveStart-0.01 && fishingBarPosition < fishingAchieveStart+0.01) {
                 fishingSuccess++;
                 if(fishingSuccess == 1) {
                     fishingState = -1;
                     let heading = localplayer.getHeading() + 90;
                     let point = {
                         x: localplayer.position.x + 15*Math.cos(heading * Math.PI / 180.0),
                         y: localplayer.position.y + 15*Math.sin(heading * Math.PI / 180.0),
                         z: localplayer.position.z
                     }
                     mp.events.callRemote('giveRandomFish');
                     isEnter=false;
                 } else {

                     movementRight = true;
                     fishingBarPosition = 0.476;
                     fishingAchieveStart = Math.random() * 0.39 + fishingBarMin;
                 }
             } else {
                 fishingState = -1;
                 mp.events.callRemote('stopFishDrop');
                 isEnter=false;
             }
             break;
     }
     return;
 }

 if(fishingState == 3) {
     mp.game.graphics.drawRect(0.47, 0.2, 0.39, 0.025, 60, 60, 60, 120);
     // x y w h r g b a
     mp.game.graphics.drawRect(fishingAchieveStart, 0.2, 0.030, 0.025, 0, 255, 0, 255);
     mp.game.graphics.drawRect(fishingBarPosition, 0.19, 0.002, 0.026, 255, 255, 255, 255);
     if(movementRight) {
         fishingBarPosition += 0.001;
         if(fishingBarPosition > fishingBarMax) {
             fishingBarPosition = fishingBarMax;
             movementRight = false;
         }
     } else {
         fishingBarPosition -= 0.001;
         if(fishingBarPosition < fishingBarMin) {
             fishingBarPosition = fishingBarMin;
             movementRight = true;
         }
     }
 }
}

// end fishing

mp.events.add('showHUD', (show) => {
    global.showhud = show;
    if (!show) mp.gui.execute(`hidehelp(${!showhud})`);
    else if (show && showHint) mp.gui.execute(`hidehelp(${!showhud})`);

    if (show) {
        mp.gui.execute(`HUD.server=${serverid};`);
        mp.gui.execute(`HUD.playerId=${mp.players.local.remoteId}`);
    }
    mp.gui.execute(`hidehud(${!showhud})`);

	var minimap = getMinimapAnchor();
    mp.gui.execute(`HUD.minimapFix=${minimap.rightX * 100}`);

    var screen = mp.game.graphics.getScreenActiveResolution(0,0);
    mp.gui.execute(`updateSafeZoneSize(${screen.x},${screen.y},${hudstatus.safezone})`);
	
	var playerId = localplayer.getVariable('REMOTE_ID');	
	mp.gui.execute(`HUD.playerId='${playerId}'`);
	
	var personId = localplayer.getVariable('PERSON_ID');
	mp.gui.execute(`HUD.personId='${personId}'`);
	
    mp.game.ui.displayAreaName(showhud);
    mp.game.ui.displayRadar(showhud);
    mp.game.ui.displayHud(showhud);
    mp.gui.chat.show(showhud);
});

mp.events.add('UpdateMoney', function (temp, amount) {
    let money = temp.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
    mp.gui.execute(`HUD.money="${money}"`);
});

mp.events.add('UpdateBank', function (temp, amount) {
    let money = temp.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
    mp.gui.execute(`HUD.bank="${money}"`);
});

mp.events.add('setWanted', function (lvl) {
    mp.game.gameplay.setFakeWantedLevel(lvl);
});

mp.events.add('clinet::helpkeysonHUD', (state, key, msg) => {
	mp.gui.execute(`HUD.helpkeys=${state}`)
	mp.gui.execute(`HUD.helpkey=${JSON.stringify(key)}`)
	mp.gui.execute(`HUD.helptextkey=${JSON.stringify(msg)}`)
});

mp.events.add('client::addToMissionsOnHud', (state, name, txt) => {
	mp.gui.execute(`HUD.setmission(${state},${JSON.stringify(name)},0,${JSON.stringify(txt)})`)
});

mp.events.add('client::addToMissionsOnHudJOB', (state, name, txt) => {
	mp.gui.execute(`HUD.setjob(${state},${JSON.stringify(name)},${JSON.stringify(txt)})`)
});

mp.events.add('client::closeMissionOnHud', () => {
	mp.gui.execute(`HUD.activequest=false`);
});

mp.events.add('PaydayHud', function(state, lvl, payday) {
    mp.gui.execute(`HUD.payday=${state}`);
    mp.gui.execute(`HUD.paydaycount=${payday}`);
    mp.gui.execute(`HUD.lvl=${lvl}`);
});

mp.events.add('DemorganShowhelp', function(time, reason, admin) {
	mp.gui.execute(`HUD.demorgan=true`);
	mp.gui.execute(`HUD.demorgantime=${time}`);
	mp.gui.execute(`HUD.demorganadmin=${admin}`);
	mp.gui.execute(`HUD.demorganreason=${reason}`);
});

mp.events.add('UpdateLastBonus', function (temp) {
    mp.gui.execute(`HUD.lastbonus="${temp}"`);
});

mp.keys.bind(Keys.VK_F5, false, function () { // F5 key
    if (global.menuOpened) {
        global.menuClose();
        mp.gui.cursor.visible = false;
    }
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


mp.keys.bind(Keys.VK_J, false, function () { // belt system
     if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
    if (localplayer.isInAnyVehicle(false)) {
        if (mp.players.local.vehicle.getClass() == 14 || mp.players.local.vehicle.getClass() == 21 || mp.players.local.vehicle.getClass() == 13 || mp.players.local.vehicle.getClass() == 8) return; 
		lastCheck = new Date().getTime();

        if (hudstatus.belt) {
            localplayer.setConfigFlag(32, true);
			global.soundCEF.execute(`playSound("unbuckle");`);
        }
        else {
            localplayer.setConfigFlag(32, false);
			global.soundCEF.execute(`playSound("buckle");`);
        }

        hudstatus.belt = !hudstatus.belt;
        mp.gui.execute(`HUD.belt=${hudstatus.belt}`);
        var testBelt = localplayer.getConfigFlag(32, true);
        mp.events.callRemote('beltCarPressed', testBelt);
    }
});
mp.events.add('soundAddCash', function() {
	mp.game.audio.playSoundFrontend(-1, 'LOCAL_PLYR_CASH_COUNTER_INCREASE', 'DLC_HEISTS_GENERAL_FRONTEND_SOUNDS', true);
});
mp.events.add('plsound', (a,b) => {
	mp.game.audio.playSoundFrontend(-1, a, b, true);
});
global.passports = {};
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
			
			var name = "";
			if(player.getVariable('IS_MASK') == true) {
				name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Незнакомец (${id})`;
			} else {
				name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true || passports[player.name] != undefined || mp.storage.data.friends[player.name] != undefined) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Незнакомец (${id})`;
			}
            msg = msg.replace("{name}", name);
        }
    });

    if (type === "chat" || type === "s")
        msg = `!{#${chatcolor}}${msg}`;

    mp.gui.chat.push(msg);
});

mp.events.add('render', (nametags) => {

    if (!global.loggedin) return;
    if(fishingState > 0) {
        drawFishingMinigame();
    }
    // Disable HUD components.    
	mp.game.ui.hideHudComponentThisFrame(1); // HUD_WANTED_STARS
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
	
	if (localplayer.getVariable('IS_ADMIN') == true) {
		mp.gui.execute(`HUD.adminmod=true`);
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
    
    // Update CEF safezone.
    var lastsafezone = mp.game.graphics.getSafeZoneSize();
    if(lastsafezone != hudstatus.safezone) {
        
        hudstatus.safezone = lastsafezone;
        var resolution = mp.game.graphics.getScreenActiveResolution(0,0);
        mp.gui.execute(`updateSafeZoneSize(${resolution.x},${resolution.y},${hudstatus.safezone})`);
    }

    
    if (localplayer.isInAnyVehicle(false)) {

		if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			if (mp.players.local.vehicle.getClass() == 14) 
			{
				mp.events.call('clinet::helpkeysonHUD', true, "X", "БРОСИТЬ ЯКОРЬ")
				hudstatus.inBoat = true;
			}
			if (!hudstatus.invehicle) mp.gui.execute(`HUD.inVeh=1`);
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

			var engine = veh.getIsEngineRunning();
			if (engine != null && engine !== hudstatus.engine) {
				if (engine == true) mp.gui.execute(`HUD.engine=1`);
				else mp.gui.execute(`HUD.engine=0`);

				hudstatus.engine = engine;
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
			var gear = (veh.gear).toFixed();
			mp.gui.execute(`HUD.gear=${gear}`);
			
			var rpm = (veh.rpm * 40).toFixed();
			mp.gui.execute(`HUD.rpm=${rpm}`);
			
			var hp = veh.getEngineHealth() / 10; //getHealth
			hp = hp.toFixed();
			if (hp !== hudstatus.health) {
				mp.gui.execute(`HUD.hp=${hp}`);
				hudstatus.health = hp;
			}

			if (new Date().getTime() - hudstatus.updatespeedTimeout > 50) {
				let speed = (veh.getSpeed() * 3.6).toFixed();
				mp.gui.execute(`HUD.updateSpeed(${speed})`);
				hudstatus.updatespeedTimeout = new Date().getTime();

				if (cruiseSpeed != -1) // kostyl'
					veh.setMaxSpeed(cruiseSpeed);
			}
		}
    } 
    else 
    {
        if (hudstatus.invehicle) mp.gui.execute(`HUD.inVeh=0`);
        hudstatus.invehicle = false;
        hudstatus.belt = false;
		if (hudstatus.inBoat) {
			mp.events.call('clinet::helpkeysonHUD', false, null, null);
			hudstatus.inBoat = false;
		}
        mp.gui.execute(`HUD.belt=${hudstatus.belt}`);
    }
});

mp.events.add('UpdateEat', function (temp, amount) {
    mp.gui.execute(`HUD.eat=${temp}`);
});

mp.events.add('render', function() {
	var online = mp.players.length;
	var playernameononline = localplayer.name.replace("_", " ");
	if (online != mp.players.length) {
		online = mp.players.length;
		mp.game.gxt.set("PM_PAUSE_HDR", "~g~Shadow Roleplay ~r~| ~w~" + `${playernameononline}` + " (#" + `${localplayer.getVariable("PERSON_ID")}` + ")" + " ~r~| ~w~Online: " + `${online}`);
	}
	mp.game.gxt.set("PM_PAUSE_HDR", "~g~Shadow Roleplay ~r~| ~w~" + `${playernameononline}` + " (#" + `${localplayer.getVariable("PERSON_ID")}` + ")" + " ~r~| ~w~Online: " + `${online}`);
    if (!global.loggedin) return;
    if(fishingState > 0) {
        drawFishingMinigame();
    }
});

let freeze = false;
mp.keys.bind(Keys.VK_X, false, function () { // X key
	try {
		if (!loggedin || chatActive || mp.gui.cursor.visible) return;
        if (mp.players.local.vehicle.getClass() == 14) {
            if(!freeze){
                let speed = (mp.players.local.vehicle.getSpeed() * 3.6).toFixed();
                if(speed>6){
                    mp.events.call('notify', 4, 9, "Чтобы бросить якорь нужно остановить судно.", 7000);
                    return;
                }
            }
            freeze = !freeze;
            mp.players.local.vehicle.freezePosition(freeze);    
        }
	} catch { }
});

mp.events.add('client::btnadminHUD', (a) => {
	mp.events.callRemote('server::btnadminHUD', a);
});

mp.game.ui.setMinimapComponent(6, !0, -1); // "Vespucci Beach lifeguard building"
mp.game.ui.setMinimapComponent(7, !0, -1); // "Beam Me Up (Grand Senora Desert)"
mp.game.ui.setMinimapComponent(8, !0, -1); // "Paleto Bay fire station building"
mp.game.ui.setMinimapComponent(9, !0, -1); // "Land Act Dam"
mp.game.ui.setMinimapComponent(10, !0, -1); // "Paleto Forest cable car station"
mp.game.ui.setMinimapComponent(11, !0, -1); // "Galileo Observatory"
mp.game.ui.setMinimapComponent(12, !0, -1); // "Engine Rebuils building (Strawberry)"
mp.game.ui.setMinimapComponent(13, !0, -1); // "Mansion pool (Richman)"
mp.game.ui.setMinimapComponent(14, !0, -1); // "Beam Me Up (Grand Senora Desert) (2)"
mp.game.ui.setMinimapComponent(15, !0, -1); // "Fort Zancudo"

mp.events.add('UpdateWater', function (temp, amount) {
    mp.gui.execute(`HUD.water=${temp}`);
});
}