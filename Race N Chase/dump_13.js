{
require('./UIHud/CommandsList.js');

const Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};

let minimap = {};

let chatOpacityTimeout = null;

var resolution = mp.game.graphics.getScreenActiveResolution(0,0);
let lastSpecHPChange = Date.now();

var miniHUDVars = {
    bottom: 0, 
    left: 0,
    visible: false,
    voice: "Standby",
    direction: "N/A",
    street: "N/A",
    zone: "N/A",
    jailed: false,
    jail: "N/A",

    // SPEC VARS
    spec: false,
    ping: 0,
    packetloss: 0.0,
};

let speedo = false;
let speedoMax = 0.0;
let speedoCur = 0.0;

// Scoreboard
let updater = null;
scoreboardToggled = false;
scoreboardCursor = false;
let scoreboardBinded = false;

// StackOverflow cause I'm too lazy to do this myself and don't wanna type getvariable etc etc every time
function firstLetterUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// https://github.com/glitchdetector/fivem-minimap-anchor
function getMinimapAnchor() {
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
}



function drawText(text, drawXY, font, color, scale, alignRight = false) {
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale, scale);
    mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.invoke(Natives.SET_TEXT_OUTLINE);

    if (alignRight) {
        mp.game.ui.setTextRightJustify(true);
        mp.game.ui.setTextWrap(0, drawXY[0]);
    }

    mp.game.ui.drawText(drawXY[0], drawXY[1]);
}

function TimeFormat(time)
{   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

mp.keys.bind(
    0x76,
    false,
    () => {
        if(menuToggled !== undefined && menuToggled) return;
        if(!chatStatus && 
            !(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false)) 
        {
			if (mp.keys.isDown(16) === true) 
            { // Shift is pressed
                mp.storage.data.menu.nametags = !mp.storage.data.menu.nametags;
                renderNametags = mp.storage.data.menu.nametags;
            }
            else 
            {
                mp.events.callLocal("ToggleHud", !showHud);
            }
        }
    }
);

mp.events.add('ToggleNametags', (state) => {
    renderNametags = state;
});

/*
 gm.topRight = false;
      topRightInfo
      killFeed
      gameProgress
      hud
      topRight
*/

function increaseChatOpacity(time = 4000){
    if(chatOpacityTimeout != null){
        clearInterval(chatOpacityTimeout);
    }

    if(mp.storage.data.menu.ActiveChatOpacity !== undefined){
        UIHud.execute(`gm.$refs.chat.settings.opacity = ${mp.storage.data.menu.ActiveChatOpacity.toString()}`);
    }
    else UIHud.execute(`gm.$refs.chat.settings.opacity = 1.0`);

    // i know this is dumb but idk i cba to fix it it didnt work otherwise
    chatOpacityTimeout = setTimeout(() => {
        if(!chatStatus && UIHud != null && UIHud.active == true){
            if(mp.storage.data.menu.ShowInactiveChat == undefined){
                if(mp.storage.data.menu.InactiveChatOpacity == undefined){
                    UIHud.execute(`gm.$refs.chat.settings.opacity = 0.5`);
                }
                else UIHud.execute(`gm.$refs.chat.settings.opacity = ${mp.storage.data.menu.InactiveChatOpacity.toString()}`);
            }
            else{
                if(mp.storage.data.menu.ShowInactiveChat == false){
                    UIHud.execute(`gm.$refs.chat.settings.opacity = 0.0`);
                }
                else{
                    if(mp.storage.data.menu.InactiveChatOpacity == undefined){
                        UIHud.execute(`gm.$refs.chat.settings.opacity = 0.5`);
                    }
                    else UIHud.execute(`gm.$refs.chat.settings.opacity = ${mp.storage.data.menu.InactiveChatOpacity.toString()}`);                    
                }
            }
        }
    }, time);
}

function activateChat(toggle){
    if(UIHud == null) return;
    UIHud.execute(`gm.chat = ${toggle.toString()}`);
};
function focusChat(toggle){
    if(UIHud == null) return;
    UIHud.execute(`gm.$refs.chat.active = ${toggle.toString()}`);

    if(toggle){
        if(mp.storage.data.menu.ActiveChatOpacity !== undefined){
            UIHud.execute(`gm.$refs.chat.settings.opacity = ${mp.storage.data.menu.ActiveChatOpacity.toString()}`);
        }
        else UIHud.execute(`gm.$refs.chat.settings.opacity = 1.0`);
    }
    else{
        increaseChatOpacity(3000);
    }

    mp.gui.cursor.show(toggle, toggle);
    mp.events.callRemote("onFocusChat", toggle);
}
function pushMessageToChat(message){
    if(UIHud == null) return;
    UIHud.execute(`gm.$refs.chat.messages.push("${message}")`);
    increaseChatOpacity(4000);
}
function clearChat(){
    if(UIHud == null) return;
    UIHud.execute(`gm.$refs.chat.messages = [];`);
}
let api = {"chat:push": pushMessageToChat, "chat:clear": clearChat, "chat:activate": activateChat, "chat:show": focusChat}; 

mp.events.add("pushMsgToChat", (msg) => {
    pushMessageToChat(msg);
})

mp.events.add("chat:push", (msg) => {
    pushMessageToChat(msg);
});
mp.events.add("chat:clear", (msg) => {
    clearChat();
});
mp.events.add("chat:activate", (toggle) => {
    activateChat(toggle);
});
mp.events.add("chat:show", (toggle) => {
    focusChat(toggle);
});

mp.events.add("HideAllElementsExceptChat", (value) => {
    if(value == false){
        UIHud.execute(
        `
            gm.topRightInfo = false; 
            gm.killFeed = false;
            gm.chat = ${showHud.toString()};
        `);
    }
    else{
        UIHud.execute(
            `
            gm.topRightInfo = ${mp.storage.data.menu.topRightInfo}; 
            gm.killFeed = ${mp.storage.data.menu.killFeed};
                gm.chat = ${showHud.toString()};
            `);       
    }
});

/*
for(let fn in api)
{
    mp.events.add(fn, api[fn]);
}
*/
mp.events.add("onChatPressEnter", () => {
    focusChat(false);
	mp.events.call("onOpenChatbox", false);
});

mp.events.add("InitiateCustomChat", () => {
    mp.gui.chat.show(false);
    setTimeout(() =>{
        mp.events.callLocal('RestartMenu');
    }, 250);
    setTimeout(() => {
        mp.events.callLocal('RestartHUD');
    }, 250);
});

mp.events.add("render", () => {
    if(chatStatusLate){
        mp.game.controls.disableControlAction(0, 200, true); // prevent menu from opening when pressing ESC for chat 
    }    
});
mp.keys.bind(0x1B, true, function() { // ESC key
    if(chatStatus){
        focusChat(false);
        mp.events.call("onOpenChatbox", false);       
    }
});

mp.keys.bind(0x54, true, function() { // T key
    if(!chatStatus)
    {
        focusChat(true);
        mp.events.call("onOpenChatbox", true);
    }
});

mp.events.add("TogglePlayerChat", (toggle) => {
    activateChat(toggle);
});

mp.events.add('RestartHUD', () => {
    if(UIHud !== null)
    {
        UIHud.destroy();
        UIHud = null;
    }

    UIHud = mp.browsers.new("package://UIHud/index.html");
    setTimeout(() => {
        UIHud.markAsChat();
        UIHud.execute(`gm.$refs.chat.commands = ${JSON.stringify(CommandsDataJSON)}`);
        UIHud.execute(`gm.$refs.chat.active = false;`)
        UIHud.execute(`gm.$refs.chat.settings = {
            opacity: 1,
            autoScroll: true,
        }`);
    }, 1000);
    UIHud.execute(`gm.hud = false;`);
    
});

let createdTooltips = []; // to keep track of created tooltips / preventing duplicates

mp.events.add('AddTooltip', (key, action, team) => {
    
    if(UIHud == null) return;
    if(createdTooltips.indexOf(key) != -1) return;
    if(mp.storage.data.menu.tooltips !== true) return;

    let color = "#383838FF";
    switch(team){
        case 0: color = "#ffae00ff";
        break;
        case 1: color = "#0097ffff";
        break;
        default: color = "#383838FF";
    }

    createdTooltips.push(key);

    UIHud.execute(`gm.$refs.TopRight.$refs.Tooltips.tips.push({
        key: "${key}",
        action: "${action}",
        color: "${color}"
    })`);
});
mp.events.add('RemoveTooltip', (key) => {
    if(UIHud == null) return;
    if(createdTooltips.indexOf(key) == -1) return;

    UIHud.execute(`if(gm.$refs.TopRight.$refs.Tooltips.tips.indexOf(gm.$refs.TopRight.$refs.Tooltips.tips.filter(function(el){return el.key == "${key}"})[0]) != -1){
        gm.$refs.TopRight.$refs.Tooltips.tips.splice(gm.$refs.TopRight.$refs.Tooltips.tips.indexOf(gm.$refs.TopRight.$refs.Tooltips.tips.filter(function(el){return el.key == "${key}"})[0]), 1);        
    }`);
    createdTooltips.splice(createdTooltips.indexOf(key), 1);
});

let keyTrunk = true; // true = key trunk, false = key seatbelt displayed

mp.events.add('ToggleTooltips', (status) =>
{
    mp.storage.data.menu.tooltips = status;

    if(status)
    {
        mp.events.callLocal("AddTooltip", "M", "Menu", -1);
        mp.events.callLocal("AddTooltip", String.fromCharCode(curVoiceBind), "Voice Chat", -1);
    }
    else {

        createdTooltips.forEach(key => {
            UIHud.execute(`if(gm.$refs.TopRight.$refs.Tooltips.tips.indexOf(gm.$refs.TopRight.$refs.Tooltips.tips.filter(function(el){return el.key == "${key}"})[0]) != -1){
                gm.$refs.TopRight.$refs.Tooltips.tips.splice(gm.$refs.TopRight.$refs.Tooltips.tips.indexOf(gm.$refs.TopRight.$refs.Tooltips.tips.filter(function(el){return el.key == "${key}"})[0]), 1);        
            }`);
        });

        createdTooltips = [];
    }
});

mp.events.add("OneSecondEvent", () => {

    if(mp.storage.data.menu.tooltips == true)
    {
        if(mp.players.local.Team != 0 && mp.players.local.Team != 1){
            if(createdTooltips.indexOf("H") != -1) mp.events.callLocal("RemoveTooltip", "H");
        }

        if(mp.players.local.vehicle){
            if(mp.players.local.getVariable("Team") == 1 && chaseRunning)
                if(createdTooltips.indexOf("B") == -1) mp.events.callLocal("AddTooltip", "B", "Silent Siren", 1);
                
            if(createdTooltips.indexOf("Y") == -1) mp.events.callLocal("AddTooltip", "Y", "Engine", -1);
            if(createdTooltips.indexOf("L") == -1) mp.events.callLocal("AddTooltip", "L", "Lock", -1);
        }
        else{
            if(createdTooltips.indexOf("Y") != -1) mp.events.callLocal("RemoveTooltip", "Y");
            if(createdTooltips.indexOf("L") != -1) mp.events.callLocal("RemoveTooltip", "L");
            if(createdTooltips.indexOf("B") != -1) mp.events.callLocal("RemoveTooltip", "B");     
        }
        if(mp.players.local.getVariable("Team") == 1 && chaseRunning){
            if(createdTooltips.indexOf(String.fromCharCode(curGPSBind)) == -1) 
            {
                mp.events.callLocal("AddTooltip", String.fromCharCode(curGPSBind), "GPS", 1);
            }
        }
        else{
            if(createdTooltips.indexOf(String.fromCharCode(curGPSBind)) != -1) mp.events.callLocal("RemoveTooltip", String.fromCharCode(curGPSBind));
            if(createdTooltips.indexOf("B") != -1) mp.events.callLocal("RemoveTooltip", "B");     
        }

        if(!mp.players.local.isInAnyVehicle(false)) 
        {
            if(createdTooltips.indexOf("J") != -1 && !keyTrunk)
            {
                mp.events.callLocal("RemoveTooltip", "J");
                keyTrunk = true;
            }

            let veh = getClosestVehicle(mp.players.local.position);

            if(veh !== undefined && mp.vehicles.exists(veh.vehicle) && veh.vehicle.handle !== 0)
            {
                let sidebones = [
                    "bonnet",
                    "boot"
                ];
          
                let closestHandle = "";
                let closestDist = 100.0;
                sidebones.forEach((side) => {
                    let bone = veh.vehicle.getBoneIndexByName(side);
                    if(bone != -1)
                    {
                        let dist = calcDist(mp.players.local.position, veh.vehicle.getWorldPositionOfBone(bone));
                        if(dist < closestDist)
                        {
                            closestDist = dist;
                            closestHandle = side;
                        }
                    }
                });
        
                if(closestDist <= 3.5)
                {
                    if((veh.vehicle.getVariable("Locked") === undefined || veh.vehicle.getVariable("Locked") == false) || 
                    (veh.vehicle.getVariable("Locked") == true && (mp.players.local.weapon == 0x84BD7BFD || mp.players.local.weapon == 2227010557)))
                    {
                        if(createdTooltips.indexOf("J") == -1) 
                        {
                            if(closestHandle == "boot") mp.events.callLocal("AddTooltip", "J", "Trunk", -1);
                            else if(closestHandle == "bonnet") mp.events.callLocal("AddTooltip", "J", "Bonnet", -1);
                        }
                    }
                    else if(createdTooltips.indexOf("J") != -1) mp.events.callLocal("RemoveTooltip", "J");
                }
                else if(createdTooltips.indexOf("J") != -1) mp.events.callLocal("RemoveTooltip", "J");
            }
            else if(createdTooltips.indexOf("J") != -1) mp.events.callLocal("RemoveTooltip", "J");
        }
        else
        {
            if((createdTooltips.indexOf("J") != -1 && keyTrunk) || createdTooltips.indexOf("J") == -1)
            {
                mp.events.callLocal("RemoveTooltip", "J");
                
                if(mp.players.local.vehicle.getClass() != 8 && mp.players.local.vehicle.model != mp.game.joaat('policeb'))
                {
                    mp.events.callLocal("AddTooltip", "J", "Seatbelt", -1);
                }

                keyTrunk = false;
            }
        }    
    }

    if(mp.storage.data.menu.HUD == false)
    {
        UIHud.active = false;
    }
    renderNametags = mp.storage.data.menu.nametags;
});

mp.events.add('browserDomReady', (browser) => {
    if(UIHud != null && browser == UIHud)
    {
        // Set vars that aren't reset on login and shit. Basically init().
        UIHud.execute(`gm.topRightInfo = ${mp.storage.data.menu.topRightInfo}; gm.killFeed = ${mp.storage.data.menu.killFeed};`);
        UIHud.execute(`gm.$refs.MiniHud.items = [];`);

        // Initialize miniHUD
        miniHUDVars["bottom"] = ((resolution.y - (getMinimapAnchor().bottomY * resolution.y)) + 0);
        miniHUDVars["left"] = ((getMinimapAnchor().rightX * resolution.x) + 10) + ((mp.storage.data.menu.alwaysExpandedMap == true) ? 162 : 0);

        UIHud.execute(`gm.$refs.MiniHud.left = "${miniHUDVars["left"]}px";`);
        UIHud.execute(`gm.$refs.MiniHud.bottom = "${miniHUDVars["bottom"]}px";`);  

        // SPECTATE VARS
        UIHud.execute(`gm.$refs.MiniHud.items.push({ 
            name: "ping",
            icon: "fa-solid fa-stopwatch",
            init: "0 ms",
            color: "#ff8084"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.items.push({ 
            name: "packetloss",
            icon: "fa-solid fa-minus",
            init: "0.0%",
            color: "#f7aa45"
        });`);
        //
        
        UIHud.execute(`gm.$refs.MiniHud.items.push({
            name: "jail",
            icon: "fa-solid fa-ban",
            init: "N/A",
            color: "#c73228"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.items.push({
            name: "visible",
            icon: "fa-solid fa-globe",
            init: "Visible",
            color: "#65e9fa"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.items.push({
            name: "voice",
            icon: "fa-solid fa-microphone",
            init: "Standby",
            color: "#c365fa"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.items.push({
            name: "direction",
            icon: "fa-solid fa-compass",
            init: "N/A",
            color: "#c3fa65"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.items.push({
            name: "street",
            icon: "fa-solid fa-location-dot",
            init: "N/A",
            color: "#fae165"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.items.push({
            name: "zone",
            icon: "fa-solid fa-location-crosshairs",
            init: "N/A",
            color: "#fa65b0"
        });`);

        UIHud.execute(`gm.$refs.MiniHud.$refs.jail.show = ${miniHUDVars["jailed"]};`);
        UIHud.execute(`gm.$refs.MiniHud.$refs.visible.show = false;`);
        UIHud.execute(`gm.$refs.MiniHud.$refs.ping.show = false;`);
        UIHud.execute(`gm.$refs.MiniHud.$refs.packetloss.show = false;`);

        mp.events.callLocal("ToggleTooltips", mp.storage.data.menu.tooltips);

        if(mp.storage.data.menu.HUD == false)
        {
            UIHud.active = false;
        }
    }
});

mp.events.add('ToggleHud', (toggle) => {
    showHud = toggle;
    
    if(UIHud != null)
    {
        if(mp.storage.data.menu.HUD == false)
        {
            UIHud.active = false;
        }

        UIHud.execute(`gm.hud = ${toggle};`);
    }

    activateChat(showHud);
    mp.game.ui.displayRadar(showHud);
});

mp.keys.bind(0x75, false, () => {
    showReticule = !showReticule;
});

mp.keys.bind(0x74, false, () => {
    if(menuToggled !== undefined && menuToggled) return;
    if(scoreboardToggled == true) return;
    if(Date.now() - lastChatToggle >= 500 && chatStatus == false && 
        (mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true))
    {
        traceLastFunc(`[Players] Attempt tog /DL`);
        
        mp.events.callRemote("OnScriptedKeyPress", 0x74, true);
    }
});

mp.events.add('ResetKillFeed', () => {
    if(UIHud != null)
    {
        UIHud.execute(`gm.killFeed = false;`);
        UIHud.execute(`gm.killFeed = ${mp.storage.data.menu.killFeed};`);
    }
});

mp.events.add("pushToKillFeed", (killer, killerColor, weapon, victim, victimColor) => {
    if(UIHud != null) UIHud.execute(`gm.$refs.TopRight.$refs.KillFeed.add('${killer}', '${killerColor}', '${weapon}', '${victim}', '${victimColor}');`)
});

mp.events.add("pushToKillFeed2", (victim, color, cause) => {
    if(UIHud != null) UIHud.execute(`gm.$refs.TopRight.$refs.KillFeed.add("${victim}", "${color}", "${cause}");`)
});

mp.events.add("UpdateRateEvent", () => {

    // only do stuff if radar is enabled and visible
    let streetName = "N/A";
    let zoneName = "N/A";
    if (mp.game.invoke(Natives.IS_RADAR_ENABLED) && !mp.game.invoke(Natives.IS_RADAR_HIDDEN)) {
        minimap = getMinimapAnchor();

        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);

        zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
    }
    
    if(UIHud != null && (!(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false || mp.players.local.getVariable("InLobby") === undefined)))
    {
        UIHud.execute(`gm.$refs.TopRight.$refs.Info.points = ${mp.players.local.getVariable("Points")};`);
        
        let lobbyStr = "";
        
        let lobbyPlayers = 0;
        mp.players.forEach((pl) => {
            if(!(pl.getVariable("pLogged") === undefined || pl.getVariable("pLogged") == false || pl.getVariable("InLobby") === undefined))
            {
                if(pl.getVariable("InLobby") == mp.players.local.getVariable("InLobby")) lobbyPlayers++;
            }
        });

        if(mp.players.local.getVariable("InLobby") == -2) lobbyStr = "Jail";
        if(mp.players.local.getVariable("InLobby") == -3) lobbyStr = "Freeroam";
        if(mp.players.local.getVariable("InLobby") == -4) lobbyStr = "Derby";
        if(mp.players.local.getVariable("InLobby") == -5) lobbyStr = "Customizer";
        if(mp.players.local.getVariable("InLobby") > -1) lobbyStr = mp.players.local.getVariable("InLobby").toString();
        
        UIHud.execute(`gm.$refs.TopRight.$refs.Info.lobbyID = "${lobbyStr}";`);

        let camera = mp.cameras.new("gameplay");
        let cameraDirection = camera.getDirection();
        let dirtext = "N/A";

        if (0.3 < cameraDirection.x && 0.3 < cameraDirection.y) {
            dirtext = "NE";
        }
        else if (cameraDirection.x < -0.3 && 0.3 < cameraDirection.y) {
            dirtext = "NW";
        }
        else if (0.3 < cameraDirection.x && cameraDirection.y < -0.3) {
            dirtext = "SE";
        }
        else if (cameraDirection.x < -0.3 && cameraDirection.y < -0.3) {
            dirtext = "SW";
        }
        else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y < -0.3) {
            dirtext = "S";
        }
        else if (cameraDirection.x < -0.3 && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
            dirtext = "W";
        }
        else if (0.3 < cameraDirection.x && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
            dirtext = "E";
        }
        else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y > 0.3) {
            dirtext = "N";
        }
        camera.destroy(true);

        let voiceString = "Disabled";
                
        if(mp.players.local.getVariable("VoiceMode") == 0)
        {
            voiceString = mp.voiceChat.muted ? "Standby" : "Speaking";
        }
        else if(mp.players.local.getVariable("VoiceMode") == 1)
        {
            voiceString = mp.voiceChat.muted ? "Standby (Team)" : "Speaking (Team)";
        }
        else if(mp.players.local.getVariable("VoiceMode") == 2)
        {
            voiceString = mp.voiceChat.muted ? "Standby (Squad)" : "Speaking (Squad)";
        }

        if(currentMuteTime >= 1)
        {
            voiceString = `Muted for ${TimeFormat(currentMuteTime)}`;
        }

        let jailString = "N/A";
        if(currentJailTime >= 1)
        {
            jailString = `Jailed for ${TimeFormat(currentJailTime)}`;
        }

        if(mp.players.local.getVariable("VisibleBlip") != miniHUDVars["visible"])
        {
            miniHUDVars["visible"] = mp.players.local.getVariable("VisibleBlip");
            UIHud.execute(`gm.$refs.MiniHud.$refs.visible.show = ${miniHUDVars["visible"]};`);
        }
        if(voiceString != miniHUDVars["voice"])
        {
            miniHUDVars["voice"] = voiceString;
            UIHud.execute(`gm.$refs.MiniHud.$refs.voice.value = "${miniHUDVars["voice"]}";`);
        }
        if(dirtext != miniHUDVars["direction"])
        {
            miniHUDVars["direction"] = dirtext;
            UIHud.execute(`gm.$refs.MiniHud.$refs.direction.value = "${miniHUDVars["direction"]}";`);
        }
        if(streetName != miniHUDVars["street"])
        {
            miniHUDVars["street"] = streetName;
            UIHud.execute(`gm.$refs.MiniHud.$refs.street.value = "${miniHUDVars["street"]}";`);
        }
        if(zoneName != miniHUDVars["zone"])
        {
            miniHUDVars["zone"] = zoneName;
            UIHud.execute(`gm.$refs.MiniHud.$refs.zone.value = "${miniHUDVars["zone"]}";`);
        }

        if(currentJailTime >= 1)
        {
            if(miniHUDVars["jailed"] != true)
            {
                miniHUDVars["jailed"] = true;
                UIHud.execute(`gm.$refs.MiniHud.$refs.jail.show = ${miniHUDVars["jailed"]};`);
            }
            miniHUDVars["jail"] = jailString;
            UIHud.execute(`gm.$refs.MiniHud.$refs.jail.value = "${miniHUDVars["jail"]}";`);
        }
        else if(miniHUDVars["jailed"] == true)
        {
            miniHUDVars["jailed"] = false;
            UIHud.execute(`gm.$refs.MiniHud.$refs.jail.show = ${miniHUDVars["jailed"]};`);
        }

        if (specState == true && specCam !== null && specTarget != null && mp.players.exists(specTarget)) 
        {
            if(miniHUDVars["spec"] == false)
            {
                miniHUDVars["spec"] = true;
                UIHud.execute(`gm.$refs.MiniHud.$refs.ping.show = true;`);
                UIHud.execute(`gm.$refs.MiniHud.$refs.packetloss.show = true;`);

                UIHud.execute(`gm.$refs.MiniHud.$refs.direction.show = false;`);
            }
        
            if(miniHUDVars["packetloss"] != specTarget.getVariable("Packetloss").toFixed(2))
            {
                miniHUDVars["packetloss"] = specTarget.getVariable("Packetloss").toFixed(2);
                UIHud.execute(`gm.$refs.MiniHud.$refs.packetloss.value = "${miniHUDVars["packetloss"]}%"`);
            }
            if(miniHUDVars["ping"] != specTarget.getVariable("Ping"))
            {
                miniHUDVars["ping"] = specTarget.getVariable("Ping");
                UIHud.execute(`gm.$refs.MiniHud.$refs.ping.value = "${miniHUDVars["ping"]} ms"`);
            }
        }
        else if(miniHUDVars["spec"] == true) 
        {
            miniHUDVars["spec"] = false;
            UIHud.execute(`gm.$refs.MiniHud.$refs.ping.show = false;`);
            UIHud.execute(`gm.$refs.MiniHud.$refs.packetloss.show = false;`);

            UIHud.execute(`gm.$refs.MiniHud.$refs.direction.show = true;`);
        }
    }
});

function ToggleScoreboard()
{
    if (UIHud == null) return;

    if(scoreboardToggled)
    {
        scoreboardToggled = false;

        if(updater != null) clearInterval(updater);
        updater = null;

        mp.events.call("TogglePlayerChat", true);
        UIHud.execute(`gm.$refs.scoreboard.disableInput = true;`);
		// UIHud.execute(`gm.$refs.scoreboard.setPlayers([]);`);
        UIHud.execute(`gm.scoreboard = false;`);

        if(scoreboardCursor)
        {
            scoreboardCursor = false;
            mp.gui.cursor.show(false, false);
        }
    }
    else
    {
        scoreboardToggled = true;
        mp.events.call("TogglePlayerChat", false);

        UIHud.execute(`gm.scoreboard = true;`);
        UIHud.execute(`gm.$refs.scoreboard.disableInput = true;`);
		// UIHud.execute(`gm.$refs.scoreboard.setPlayers([]);`);
		
        updatePlayers();

        updater = setInterval(function()
        {
            if(chatStatus && scoreboardToggled)
            {
                ToggleScoreboard();
            }
            else if(!chatStatus && scoreboardToggled)
            {
                updatePlayers();
            }
        }, 1000);
    }
    return;
}

function updatePlayers()
{
    if(mp.players.local !== undefined && mp.players.exists(mp.players.local))
        UpdateStatsVars(mp.players.local);

    let updateString = `gm.$refs.scoreboard.setPlayers([`;

    let lobbyStr = '0';
	let colr = 255;
	let colg = 255;
	let colb = 255;
	let ping = 65535;
	let level = 0;
    let squad = -1;
	
    mp.players.forEach(sb => {
        lobbyStr = "-";
        colr = 255;
        colg = 255;
        colb = 255;
        ping = 0;
        level = 0;
        squad = -1;

        lobbyStr = sb.getVariable("InLobby");		
        squad = sb.getVariable("PlayerSquadID");	
		if(sb.getVariable("Color_R") !== undefined) colr = sb.getVariable("Color_R");
		if(sb.getVariable("Color_G") !== undefined) colg = sb.getVariable("Color_G");
		if(sb.getVariable("Color_B") !== undefined) colb = sb.getVariable("Color_B");
		if(sb.getVariable("Level") !== undefined) level = sb.getVariable("Level");
		if(sb.getVariable("Ping") !== undefined) ping = sb.getVariable("Ping");

        updateString += `{lid: ${lobbyStr}, squad: ${squad},
        color: 'rgb(${colr}, ${colg}, ${colb})', 
        name: '${sb.name}', level: ${level}, ping: ${ping}},`;
    });

    updateString += `]);`;

    if(UIHud != null) UIHud.execute(updateString);
    return;
}

mp.keys.bind(
    0x1B,
    false,
    () => {
        if(UIHud != null && scoreboardToggled) ToggleScoreboard();
    }
);

mp.keys.bind(0x71, false, function () {
    if(scoreboardToggled)
    {
        if(scoreboardCursor)
        {
            scoreboardCursor = false;
            mp.gui.cursor.show(false, false);
            UIHud.execute(`gm.$refs.scoreboard.disableInput = true;`);
            
            if(!scoreboardBinded) mp.events.callLocal('ScoreboardToggleTyping', false);
        }
        else
        {
            scoreboardCursor = true;
            mp.gui.cursor.show(true, true);
            UIHud.execute(`gm.$refs.scoreboard.disableInput = false;`);

            //if(scoreboardBinded) mp.events.callLocal('ScoreboardToggleTyping', true);
        }
    }
});

function ScoreboardKeyTrigger()
{
    if(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false) return;
    if(Date.now() - lastChatToggle <= 500) return;
    if(menuToggled !== undefined && menuToggled) return;
    if(chatStatus && !scoreboardToggled) return;
    if(menuToggled) return;

    ToggleScoreboard();
}

mp.events.add('ScoreboardToggleTyping', (state) => {
    if(state && scoreboardBinded)
    {
        mp.keys.unbind(0x4F, false, ScoreboardKeyTrigger);
        scoreboardBinded = false;
        mp.events.callLocal("MenuToggleTyping", state);
    }
    else if(!state && !scoreboardBinded)
    {
        mp.keys.bind(0x4F, false, ScoreboardKeyTrigger);
        scoreboardBinded = true;
        mp.events.callLocal("MenuToggleTyping", state);
    }
});

mp.events.callLocal('ScoreboardToggleTyping', false);

mp.events.add("HUDError", (msg, icon) => {
    if(!showHud && mp.players.local.getVariable("pLogged") == true) return;

	let insertString = `iziToast.show({
		message: "${msg}",
		icon: "${icon}",
		color: "red",
		timeout: 5000,
		close: true		
	});`;

    if(UIHud != null) UIHud.execute(insertString);
});

mp.events.add("HUDNotify", (msg, color, icon, close, timeout, orientation, displaymode) => {
    if(!showHud && mp.players.local.getVariable("pLogged") == true) return;
    
    let insertString = `iziToast.show({`;
    insertString += `message: \`${msg}\`, `;
    insertString += `color: "${color}", `;
    insertString += `icon: "${icon}", `;
    insertString += `close: ${close.toString()}, `;
    insertString += `timeout: ${timeout},`;
    if(orientation.length > 1) insertString += `position: \`${orientation}\`, `;
    if(displaymode.length > 1) insertString += `displayMode: \`${displaymode}\`, `;
    insertString += "});";

    if(UIHud != null) UIHud.execute(insertString);
});
// bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
mp.events.add("HUDNotify2", (title, msg, orientation, displaymode) => {
    if(!showHud && mp.players.local.getVariable("pLogged") == true) return;
    
    let insertString = `iziToast.show({`;
    insertString += `title: \`${title}\`, `;
    insertString += `message: \`${msg}\`, `;
    if(orientation.length > 1) insertString += `position: \`${orientation}\`, `;
    if(displaymode.length > 1) insertString += `displayMode: \`${displaymode}\`, `;
    insertString += "});";

    if(UIHud != null) UIHud.execute(insertString);
});



function isVehicleInLOS(target, startpos) {
    if(target === undefined) return false;

    let result = mp.raycasting.testPointToPoint(startpos, target.position, [1, 16]); // now test point to point
    
    if(result === undefined)
    {
        return true;
    }
    else if(result !== undefined)
    {
        if(result.entity !== undefined) // Entity is not undefined and might be ped or veh.
        {
            if(typeof result.entity.isAPed === 'function' && result.entity.isAPed())
            {
                return true;
            }
            if(typeof result.entity.isAVehicle === 'function' && result.entity.isAVehicle())
            {
                return true;
            }
        }
        else if(result.entity === undefined) // There's no entity, can be a object or building anything.
        {
            return false;
        }
    }
    return false;
}

mp.events.add("render", () => {
    
    mp.game.ui.hideHudComponentThisFrame(7); // area name
    mp.game.ui.hideHudComponentThisFrame(9); // street name
    mp.game.ui.hideHudComponentThisFrame(6); // vehicle name
    mp.game.ui.hideHudComponentThisFrame(8); // vehicle class
    mp.game.ui.hideHudComponentThisFrame(3); // cash
    mp.game.ui.hideHudComponentThisFrame(4); // mp_cash
    mp.game.ui.displayAmmoThisFrame(false); // HIDE AMMO

    if(showCustomCrosshair){
        if(alwaysShowCustomCrosshair == true){
            if(!customCrosshairOn){
                if(!mp.game.player.isFreeAiming()){         
                    if(!menuToggled)                     
                    {
                        customCrosshairOn = true;
                        UIMenu.execute(`gm.crosshair.enabled = true;`);
                    }
                }
                else{
                    if(isHoldingSniper()){
                        if(showCustomCrosshairInSniper){
                            customCrosshairOn = true;
                            UIMenu.execute(`gm.crosshair.enabled = true;`);                            
                        }
                        else{
                            customCrosshairOn = false;
                            UIMenu.execute(`gm.crosshair.enabled = false;`);                               
                        }
                    }
                    else{
                        customCrosshairOn = true;
                        UIMenu.execute(`gm.crosshair.enabled = true;`);
                    }
                }
            }
            else{
                if(mp.game.player.isFreeAiming()){                              
                    if(isHoldingSniper()){
                        if(showCustomCrosshairInSniper){
                            customCrosshairOn = true;
                            UIMenu.execute(`gm.crosshair.enabled = true;`);                            
                        }
                        else{
                            customCrosshairOn = false;
                            UIMenu.execute(`gm.crosshair.enabled = false;`);                               
                        }
                    }
                }               
            }
        }
        else{
            if(mp.game.invoke('0x68EDDA28A5976D07') == 1){
                if(!customCrosshairOn){
                    if(!mp.game.player.isFreeAiming()){                              
                        customCrosshairOn = true;
                        UIMenu.execute(`gm.crosshair.enabled = true;`);
                    }
                    else{
                        if(isHoldingSniper()){
                            if(showCustomCrosshairInSniper){
                                customCrosshairOn = true;
                                UIMenu.execute(`gm.crosshair.enabled = true;`);                            
                            }
                            else{
                                customCrosshairOn = false;
                                UIMenu.execute(`gm.crosshair.enabled = false;`);                                   
                            }
                        }
                        else{
                            customCrosshairOn = true;
                            UIMenu.execute(`gm.crosshair.enabled = true;`);
                        }
                    }
                }
            }
            else{
                if(customCrosshairOn){
                    customCrosshairOn = false;
                    UIMenu.execute(`gm.crosshair.enabled = false;`);
                }
            }   
        }
    }

    if(!showReticule || customCrosshairOn)
    {
        mp.game.ui.hideHudComponentThisFrame(14); // RETICULE
    }

    if(mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true)
    {       
        if ((resolution.x != mp.game.graphics.getScreenActiveResolution(0,0).x || miniHUDVars["left"] != (((getMinimapAnchor().rightX * resolution.x) + 10)) + ((mp.storage.data.menu.alwaysExpandedMap == true) ? 162 : 0)) && UIHud != null)
        {
            resolution = mp.game.graphics.getScreenActiveResolution(0,0);
            
            miniHUDVars["bottom"] = ((resolution.y - (getMinimapAnchor().bottomY * resolution.y)) + 0);
            miniHUDVars["left"] = ((getMinimapAnchor().rightX * resolution.x) + 10) + ((mp.storage.data.menu.alwaysExpandedMap == true) ? 162 : 0);

            UIHud.execute(`gm.$refs.MiniHud.left = "${miniHUDVars["left"]}px";`);
            UIHud.execute(`gm.$refs.MiniHud.bottom = "${miniHUDVars["bottom"]}px";`);  
        }
        if (mp.storage.data.menu.alwaysExpandedMap == true)
        {
            mp.game.ui.setRadarBigmapEnabled(true, false);
        }
        
        if (specState == true && specCam !== null && specTarget != null && mp.players.exists(specTarget)) 
        {
            if((mp.players.local.getHealth() != specTarget.getHealth() || mp.players.local.getArmour() != specTarget.getArmour()) && 
                Date.now() - lastSpecHPChange >= 500)
            {
                mp.events.callRemote("SpectateChangeHPAR", specTarget.getHealth(), specTarget.getArmour());
                lastSpecHPChange = Date.now();
            }

            if(specTarget.isInAnyVehicle(false))
            {
                if(!speedo)
                {
                    UIHud.execute(`gm.speedo = true;`);
                    speedo = true;
                }

                if(speedoMax != ((mp.game.vehicle.getVehicleModelMaxSpeed(specTarget.vehicle.model) * 3.6) + 25).toFixed(0))
                {
                    speedoMax = ((mp.game.vehicle.getVehicleModelMaxSpeed(specTarget.vehicle.model) * 3.6) + 25).toFixed(0);
                    UIHud.execute(`gm.$refs.BottomRight.$refs.Speedometer.maxspeed = ${speedoMax};`);
                }
                if(speedoCur != (specTarget.vehicle.getSpeed() * 3.6).toFixed(0))
                {
                    speedoCur = (specTarget.vehicle.getSpeed() * 3.6).toFixed(0);
                    UIHud.execute(`gm.$refs.BottomRight.$refs.Speedometer.speed = ${speedoCur};`);
                }
            }
            else if(speedo)
            {
                speedo = false;
                speedoMax = 0;
                speedoCur = 0;
                UIHud.execute(`gm.speedo = false;`);
            }
        }
        else {
            if(mp.players.local.isInAnyVehicle(false))
            {
                if(!speedo)
                {
                    UIHud.execute(`gm.speedo = true;`);
                    speedo = true;
                }

                if(speedoMax != ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) + 25).toFixed(0))
                {
                    speedoMax = ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) + 25).toFixed(0);
                    UIHud.execute(`gm.$refs.BottomRight.$refs.Speedo.maxspeed = ${speedoMax};`);
                }
                if(speedoCur != (mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0))
                {
                    speedoCur = (mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0);
                    UIHud.execute(`gm.$refs.BottomRight.$refs.Speedo.speed = ${speedoCur};`);
                }
            }
            else if(speedo)
            {
                speedo = false;
                speedoMax = 0;
                speedoCur = 0;
                UIHud.execute(`gm.speedo = false;`);
            }
        }
    }

    if(mp.players.local.getVariable("VehicleDL") == true)
    {
        const camera = mp.cameras.new("gameplay");

        let position = mp.players.local.position;

        if(camera !== undefined) position = camera.getCoord();
        else 
        {
            camera = mp.cameras.new("default");

            if(camera === undefined) position = mp.players.local.position;
            else position = camera.getCoord();
        }
        
        mp.vehicles.streamed.forEach(veh => {

            let dist = calcDist(veh.position, position);
            if(isVehicleInLOS(veh, position) && dist <= 32.0)
            {
                let vehName = mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(veh.model));
                let passengers = veh.getNumberOfPassengers();
                if(veh.getPedInSeat(-1) != 0) passengers++;

                let drawText = `~c~${vehName} (ID: ~w~${veh.remoteId}~c~) (~w~${passengers} Occupants~c~)\n~w~Speed: ~s~${(veh.getSpeed() * 3.6).toFixed(0)} ~w~/ ~s~${(mp.game.vehicle.getVehicleModelMaxSpeed(veh.model) * 3.6).toFixed(0)} ~w~KM/H`;

                let hp = ((veh.getHealth() / 1000) * 100).toFixed(0);
                if(hp < 35)
                {
                    drawText = drawText + `\nHP: ~r~${hp}%`;
                }
                else if(hp >= 35 && hp <= 65) 
                {
                    drawText = drawText + `\nHP: ~y~${hp}%`;
                }
                else if(hp > 65)
                {
                    drawText = drawText + `\nHP: ~g~${hp}%`;
                }
            
                let rescale = (dist / 32.0) - 0.60;
                if(rescale >= 0.40) rescale = (0.40 + (rescale / 10.0));
                if(rescale <= 0.35) rescale = (0.40 - (rescale / 10.0));

                mp.game.graphics.drawText(drawText, [veh.position.x, veh.position.y, veh.position.z], { 
                    font: 4, 
                    color: [255, 255, 255, 216], 
                    scale: [rescale, rescale], 
                    outline: true,
                    centre: true
                });
            }
        });
    }
});
}