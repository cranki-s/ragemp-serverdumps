{
require('./ServerUI/CommandsList.js');

const Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};

var wasCustomCrosshairOn = false;

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



mp.events.add("actionMenu:addItem", (id, action, color, icon) => {
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionMenu.items.push({
        id: ${id},
        name: "${action}",
        color: "${color}",
        icon: "${icon}"
    });`);
});
mp.events.add("actionMenu:removeItem", (id) => {
    ServerUI.execute(`
        if(gm.$refs.hud.$refs.base.$refs.actionMenu.items.find(i => i.id == ${id})){
            gm.$refs.hud.$refs.base.$refs.actionMenu.items.splice(gm.$refs.hud.$refs.base.$refs.actionMenu.items.indexOf(gm.$refs.hud.$refs.base.$refs.actionMenu.items.find(i => i.id == ${id})), 1);
        }
    `);
});
mp.events.add("actionMenu:removeAllItems", () => {
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionMenu.items = [];`);
});

mp.events.add('actionMenu:close', () => {
    ActionMenuActive = false;
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionMenu.enabled = false;`);
    mp.gui.cursor.show(false, false);
});
mp.events.add('actionMenu:open', () => {
    if(chatStatus == true || menuToggled == true || MDCActive == true || scoreboardToggled == true
        || VehicleSpawnerActive == true || WeaponEditorActive == true || isHotwiring == true || ClothingEditorActive == true) return;

    mp.game.invoke("0xFC695459D4D0E219", 0.5, 0.5); // SET CURSOR POSITION TO CENTER [x,y = 0.5,0.5]
    ActionMenuActive = true;
    mp.events.callLocal("actionMenu:removeAllItems");
    actionMenu_lobbyCheck();
    actionMenu_vehicleCheck();
    actionMenu_teamCheck();

    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.actionMenu.enabled = true;`);
    mp.gui.cursor.show(true, true);
});

let lastActionMenuClick = 0;

mp.events.add('actionMenu:clickItem', (actionID) => {
    if(Date.now() - lastActionMenuClick < 100) return;
    lastActionMenuClick = Date.now();

    mp.events.callLocal("actionMenu:close");

    // yes it's a long switch case with same action - this is for future in case some clientside stuff needs to be done too!
    // i could've done it better but eh we can easily change it if needed haha
    switch(actionID){
        case 0: // Vehicle lock toggle - invokes the /lock command simply
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 1: // Seatbelt toggle - invokes /seatbelt
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 2: // Medkit
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 3: // Painkiller
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 4: // Lockpick
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 5: // GPS Beacon
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 6: // Weapon Editor
        {
            setTimeout(() => {
                mp.events.callRemote("actionMenu_SelectedItem", actionID); 
            }, 100);
            break;
        }
        case 7: // Vehicle Tuner [freeroam only cuz copchase vtune requires param inputs]
        {
            setTimeout(() => {
                mp.events.callRemote("actionMenu_SelectedItem", actionID);                
            }, 100);
            break;
        }
        case 8: // Back To Lobby
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 9: // Freeroam vehicle spawning
        {
            setTimeout(() => {
                mp.events.callRemote("actionMenu_SelectedItem", actionID);                
            }, 100);
            break;
        }
        case 10: // Freeroam fix vehicle
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 11: // Dragout command
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 12: // Handcuff/revive message tip sends them to hold 'H'
        {
            ServerUI.execute(`toast('Hotkey Help', 'You must <strong>hold down "H"</strong> to perform that action!', 'warning', 3000);`);
            break;
        }
        case 13: // Engine command
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 14: // Hotwire command
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
        case 15: // Autojoin command
        {
            mp.events.callRemote("actionMenu_SelectedItem", actionID);
            break;
        }
    }
});
function actionMenu_lobbyCheck(){
    let dmID = mp.players.local.getVariable("InDM");
    if(dmID != -1){
        mp.events.callLocal("actionMenu:addItem", 8, "Go to lobby", "#f87171", "fa-door-open");  
        return;
    }
    let lobbyID = mp.players.local.getVariable("InLobby");
    if(lobbyID > -1 && mp.players.local.getVariable("Team") < 0){ // copchase lobby
        mp.events.callLocal("actionMenu:addItem", 6, "Edit Weapons", "#38bdf8", "fa-gun");   
        let color = "#a3e635";
        if(mp.players.local.getVariable("AutoJoin") == false) color = "#f87171";
        mp.events.callLocal("actionMenu:addItem", 15, "Autojoin", color, "fa-joystick");   
    }
    else if(lobbyID == -4){ // derby
        mp.events.callLocal("actionMenu:addItem", 8, "Go to lobby", "#f87171", "fa-door-open");  
    }
    else if(lobbyID == -3){ // freeroam
        mp.events.callLocal("actionMenu:addItem", 9, "Spawn Vehicle", "#4ade80", "fa-car");   
        if(mp.players.local.isInAnyVehicle(true)){
            mp.events.callLocal("actionMenu:addItem", 7, "Vehicle Tuning", "#a78bfa", "fa-car-wrench");  
            mp.events.callLocal("actionMenu:addItem", 10, "Repair Vehicle", "#c084fc", "fa-car-bolt");  
        } 
        mp.events.callLocal("actionMenu:addItem", 8, "Go to lobby", "#f87171", "fa-door-open");  
    }
}
// This function checks what team the player is in, and adds options for each team.
function actionMenu_teamCheck(){
    let team = mp.players.local.getVariable("Team");
    if(team >= 0){
        mp.events.callLocal("actionMenu:addItem", 3, "Painkiller", "#22c55e", "fa-pills");    
        
        let foundReviveTarget = false;
        mp.players.forEachInRange(mp.players.local.position, 5, (playa) => {
            if(!foundReviveTarget){
                if(playa.remoteId != mp.players.local.remoteId && playa.getVariable("Wounded") == 2 && 
                playa.getVariable("BeingRevived") == false && playa.getVariable("Team") == team){
                    foundReviveTarget = true;
                    mp.events.callLocal("actionMenu:addItem", 12, "Revive", "#fb923c", "fa-hand-holding-medical");  
                }
            }
        });

        if(team == 0){
            if(!mp.players.local.isInAnyVehicle(true)){
                mp.events.callLocal("actionMenu:addItem", 2, "Medkit", "#fb7185", "fa-kit-medical");      
                let isFound = false;
                mp.vehicles.forEachInRange(mp.players.local.position, 3.5, (vehicle) => {
                    if(!isFound)
                    {
                        if(vehicle.getVariable("Locked") == true && vehicle.getVariable("Team") != team){   
                            mp.events.callLocal("actionMenu:addItem", 4, "Lockpick", "#facc15", "fa-signature-lock");    
                            isFound = true;
                        }
                    }
                });
            }
        }
        else{
            mp.events.callLocal("actionMenu:addItem", 5, "GPS Beacon", "#60a5fa", "fa-location-dot");   
            if(!mp.players.local.isInAnyVehicle(true)){
                mp.events.callLocal("actionMenu:addItem", 2, "Medkit", "#fb7185", "fa-kit-medical");  
                
                let foundDragoutTarget = false;
                let foundCuffTarget = false;
                mp.players.forEachInRange(mp.players.local.position, 3.5, (playa) => {
                    if(!foundDragoutTarget)
                    {
                        if(playa.getVariable("Team") == 0 && playa.isInAnyVehicle(true)){
                            mp.events.callLocal("actionMenu:addItem", 11, "Drag out", "#22d3ee", "fa-person-through-window");  
                            foundDragoutTarget = true;
                        }
                    }
                    if(!foundCuffTarget && !foundReviveTarget){
                        if(playa.getVariable("Team") == 0 && !playa.isInAnyVehicle(true)){
                            mp.events.callLocal("actionMenu:addItem", 12, "Arrest", "#fb923c", "fa-handcuffs");  
                            foundCuffTarget = true;
                        }
                    }
                });
            }
        }
    }
}
// This function checks for nearby vehicle OR if player is in vehicle. If yes, it will add a LOCK option.
function actionMenu_vehicleCheck(){
    if(mp.players.local.isInAnyVehicle(false)){
        let vehicle = mp.players.local.vehicle;
        if(vehicle.getVariable("Locked") == true)
            mp.events.callLocal("actionMenu:addItem", 0, "Unlock", "#a3e635", "fa-lock-keyhole-open");
        else mp.events.callLocal("actionMenu:addItem", 0, "Lock", "#f87171", "fa-lock-keyhole");

        mp.events.callLocal("actionMenu:addItem", 1, "Seatbelt", "#fb923c", "fa-shield-slash");
    
        if(vehicle.getVariable("Fuel") == undefined || vehicle.getVariable("Fuel") > 0.0){
            if(vehicle.engine == true){
                mp.events.callLocal("actionMenu:addItem", 13, "Engine", "#60a5fa", "fa-engine");
            }
            else{
                if(vehicle.getVariable("Team") != mp.players.local.getVariable("Team")){
                    mp.events.callLocal("actionMenu:addItem", 14, "Hotwire", "#60a5fa", "fa-bolt");
                }
                else mp.events.callLocal("actionMenu:addItem", 13, "Engine", "#60a5fa", "fa-engine");
            }
        }
    }
    else{
        mp.vehicles.forEachInRange(mp.players.local.position, 3.5, (vehicle) => {
            if(vehicle.getVariable("Team") == mp.players.local.getVariable("Team"))
            {
                if(vehicle.getVariable("Locked") == true)
                    mp.events.callLocal("actionMenu:addItem", 0, "Unlock", "#a3e635", "fa-lock-keyhole-open");
                else mp.events.callLocal("actionMenu:addItem", 0, "Lock", "#f87171", "fa-lock-keyhole");
                return;
            }
        });
    }
}

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
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = ${mp.storage.data.menu.ActiveChatOpacity.toString()}`);
    }
    else ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = 1.0`);

    // i know this is dumb but idk i cba to fix it it didnt work otherwise
    chatOpacityTimeout = setTimeout(() => {
        if(!chatStatus && ServerUI != null && ServerUI.active == true){
            if(mp.storage.data.menu.showInactiveChat == undefined){
                if(mp.storage.data.menu.InactiveChatOpacity == undefined){
                    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = 0.5`);
                }
                else ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = ${mp.storage.data.menu.InactiveChatOpacity.toString()}`);
            }
            else{
                if(mp.storage.data.menu.showInactiveChat == false){
                    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = 0.0`);
                }
                else{
                    if(mp.storage.data.menu.InactiveChatOpacity == undefined){
                        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = 0.5`);
                    }
                    else ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = ${mp.storage.data.menu.InactiveChatOpacity.toString()}`);                    
                }
            }
        }
    }, time);
}

var adminVehSpawner = false;

function AddCustomVehiclesToSpawner(){
    if(ServerUI != null){

        let modelsList = ["lspdunm", "polbufac", "huntley2", "lspdvic", "prevolter", "m3e46", "pscout", "impala",
        "shegrangerold", "shergauntlet", "polbisonf", "gresleyh", "tulip2", "golfmk6", "bcso2slick", "bcat", "police3slick",
        "fibexecutioner", "police3umk"];

        for(let i = 0 ; i < modelsList.length; i++){
            ServerUI.execute(`gm.$refs.menus.$refs.vehicleSpawner.vehicles.push({
                model: "${modelsList[i]}",
                hash: "${modelsList[i]}",
                type: 25,
                image: "package://Artwork/Vehicles/${modelsList[i]}.png",
            });`);
        }
    }
}

mp.events.add("vehicleSpawner:spawnVehicle", (modelname, col1, col2) => {
    VehicleSpawnerActive = false;
    ServerUI.execute(`gm.$refs.menus.$refs.vehicleSpawner.enabled = false;`);
    mp.events.callRemote("Spawner_SpawnVehicle", modelname, adminVehSpawner, col1, col2);
    mp.gui.cursor.show(false, false);
});
mp.events.add("spawner_close", () => {
    VehicleSpawnerActive = false;
    ServerUI.execute(`gm.$refs.menus.$refs.vehicleSpawner.enabled = false;`);
    mp.gui.cursor.show(false, false);
});
mp.events.add("OpenVehicleSpawner", (carname, admin) => {
    VehicleSpawnerActive = true;
    adminVehSpawner = admin;
    ServerUI.execute(`gm.$refs.menus.$refs.vehicleSpawner.openSpawner('${carname}')`);
    mp.gui.cursor.show(true, true);
});

mp.events.add("weaponSpawner:giveWeapon", (weaponHash, ammo, targetName, attachments) => {
    VehicleSpawnerActive = false;
    mp.gui.cursor.show(false, false);
    
    mp.events.callRemote("WeaponSpawner_RequestGiveWeapon", weaponHash, ammo, targetName, attachments);
    ServerUI.execute(`gm.$refs.menus.$refs.weaponSpawner.enabled = false;`);
});
mp.events.add("weaponSpawner:close", () => {
    VehicleSpawnerActive = false;
    mp.gui.cursor.show(false, false);
    ServerUI.execute(`gm.$refs.menus.$refs.weaponSpawner.enabled = false;`);
});
mp.events.add("WeaponSpawner:show", (targetName, weaponName) => {
    VehicleSpawnerActive = true;
    ServerUI.execute(`gm.$refs.menus.$refs.weaponSpawner.openSpawner('${weaponName}', '${targetName}')`);
    mp.gui.cursor.show(true, true);
});

mp.events.add("SendClanInvite", (clanName, clanID, senderName) => {
    mp.game.audio.playSoundFrontend(-1, "CHALLENGE_UNLOCKED",  "HUD_AWARDS", true);
    ServerUI.execute(`clanInvite("Clan Invitation", "You have been invited to <strong>${clanName}</strong> by ${senderName}.", 20000, ${clanID});`);
    let notifyscoreboardstr = `toast('Show Cursor', 'To accept the invite, press <strong>[T]</strong> to open the chat & cursor, and click the Accept button.', 'nothing', 5000, 2);`;
    ServerUI.execute(notifyscoreboardstr);
});

var IsInInfiniteLoading = true;
var CanSkipLoading = false;
mp.events.add("startLoadingScreen", (time, message) => {
    if(mp.storage.data.menu.loadingscreens !== undefined && mp.storage.data.menu.loadingscreens == false){
        return;
    }

    if(time == -1){
        ServerUI.execute('gm.$refs.loadingScreen.show(true);');
        if(message != "none")
            ServerUI.execute(`gm.$refs.loadingScreen.loadingText = "${message}"`);
        else ServerUI.execute(`gm.$refs.loadingScreen.loadingText = ""`);

        IsInInfiniteLoading = true;

        setTimeout(() => {
            if(mp.players.local != null && mp.players.exists(mp.players.local) && IsInInfiniteLoading == true){
                CanSkipLoading = true;
                let notifyscoreboardstr = `toast('Skip Loading', 'Press <strong>SPACE BAR</strong> to skip the loading screen!', 'nothing', 10000, 2);`;
                ServerUI.execute(notifyscoreboardstr);
            }
        }, 10000);
    }
    else{
        ServerUI.execute(`gm.$refs.loadingScreen.show(${time});`);
        if(message != "none")
            ServerUI.execute(`gm.$refs.loadingScreen.loadingText = "${message}"`);
        else ServerUI.execute(`gm.$refs.loadingScreen.loadingText = ""`);
    }
});
mp.keys.bind(0x20, false, function() {
    if(IsInInfiniteLoading == true && CanSkipLoading == true){
        mp.events.callLocal("stopLoadingScreen");

        let notifyscoreboardstr = `toast('Skip Loading', 'Press <strong>SPACE BAR</strong> to skip the loading screen!', 'nothing', 50, 2);`;
        ServerUI.execute(notifyscoreboardstr);
    }
});
mp.events.add("stopLoadingScreen", () => {
    if(mp.storage.data.menu.loadingscreens !== undefined && mp.storage.data.menu.loadingscreens == false){
        return;
    }

    ServerUI.execute('gm.$refs.loadingScreen.hide();');
    IsInInfiniteLoading = false;
    CanSkipLoading = false;
});

mp.events.addCommand("fontsize", (size) => {
    
    if(size < 0.5 || size > 1.5){
        mp.gui.chat.push("!{#ff6347}[!] !{white}Font size must be between 0.5 and 1.5! (default: 0.9)");
        return;
    }
    mp.storage.data.chat.fontsize = size;
    mp.storage.flush();
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.fontSize = ${size}`);
});
mp.events.addCommand("pagesize", (size) => {
    
    if(size < 4 || size > 24){
        mp.gui.chat.push("!{#ff6347}[!] !{white}Page size must be between 4 and 24! (default: 18)");
        return;
    }
    mp.storage.data.chat.pagesize = size;
    mp.storage.flush();
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.pageSize = ${size}`);
});
mp.events.addCommand("timestamp", () => {

    mp.storage.data.chat.timestamp = !mp.storage.data.chat.timestamp;
    mp.storage.flush();
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.timeStamp = ${mp.storage.data.chat.timestamp.toString()}`);
    mp.gui.chat.push(`!{white}Chat timestamps have been turned ${(mp.storage.data.chat.timestamp == true ? `!{green}ON` : `!{red}OFF`)}`);
});

function activateChat(toggle){
    if(ServerUI == null) return;
    if(menuToggled){
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.enabled = false;`);
        return;
    }

    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.enabled = ${toggle.toString()}`);
};
function focusChat(toggle){
    if(ServerUI == null) return;
    if(menuToggled){
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.active = false;`);
        return;
    }
    if((VehicleSpawnerActive !== undefined && VehicleSpawnerActive == true) ||
    (WeaponEditorActive !== undefined && WeaponEditorActive == true) ||
    (ActionMenuActive !== undefined && ActionMenuActive == true) || 
    (ClothingEditorActive !== undefined && ClothingEditorActive == true) ||
    (isHotwiring !== undefined && isHotwiring == true)){
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.active = false;`);
        return;
    }
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.active = ${toggle.toString()}`);

    if(toggle){
        if(mp.storage.data.menu.ActiveChatOpacity !== undefined){
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = ${mp.storage.data.menu.ActiveChatOpacity.toString()}`);
        }
        else ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings.opacity = 1.0`);
    }
    else{
        increaseChatOpacity(3000);
    }

    mp.gui.cursor.show(toggle, false);
    mp.events.callRemote("onFocusChat", toggle);
}
function pushMessageToChat(message){
    if(ServerUI == null){return;}
/*
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.messages.push("${message}")`);
    increaseChatOpacity(4000);
*/
    mp.gui.chat.push(message);
}
function clearChat(){
    if(ServerUI == null) return;
    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.messages = [];`);
}

//let api = {"chat:push": mp.gui.chat.push, "chat:clear": clearChat, "chat:activate": activateChat, "chat:show": focusChat}; 

mp.events.add("pushMsgToChat", (msg) => {
    mp.gui.chat.push(msg);
})

mp.events.add("chat:push", (msg) => {
    mp.gui.chat.push(msg);
});

mp.events.add("chat:clear", (msg) => {
    clearChat();
});
mp.events.add("chat:activate", (toggle) => {
    mp.gui.chat.activate(toggle);
});
mp.events.add("chat:show", (toggle) => {
    mp.gui.chat.show(toggle);
});

mp.events.add("HideAllElementsExceptChat", (value) => {
    if(value == false){
        ServerUI.execute(
        `
            gm.$refs.hud.$refs.topRight.$refs.info.enabled = false; 
            gm.$refs.hud.$refs.topRight.$refs.killFeed.enabled = false;
            gm.$refs.hud.$refs.base.$refs.chat.enabled = ${showHud.toString()};
        `);
    }
    else{
        ServerUI.execute(
            `
            gm.$refs.hud.$refs.topRight.$refs.info.enabled = ${mp.storage.data.menu.topRightInfo}; 
            gm.$refs.hud.$refs.topRight.$refs.killFeed.enabled = ${mp.storage.data.menu.killFeed};
            gm.$refs.hud.$refs.base.$refs.chat.enabled = ${showHud.toString()};
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
    /*
    setTimeout(() =>{
        mp.events.callLocal('RestartMenu');
    }, 250);
    setTimeout(() => {
        mp.events.callLocal('RestartHUD');
    }, 250);
    */
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
mp.keys.bind(0x0D, true, function() { // Enter Key
    if(chatStatus){
        focusChat(false);
        mp.events.call("onOpenChatbox", false);       
    }
});

mp.keys.bind(0x54, true, function() { // T key
    if(ServerUI == null) return;
    if(menuToggled){
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.active = false;`);
        return;
    }
    if(mp.storage.data.menu.HUD !== undefined && mp.storage.data.menu.HUD == false){
        return;
    }
    if((VehicleSpawnerActive !== undefined && VehicleSpawnerActive == true) ||
    (WeaponEditorActive !== undefined && WeaponEditorActive == true) ||
    (ClothingEditorActive !== undefined && ClothingEditorActive == true) ||
    (ActionMenuActive !== undefined && ActionMenuActive == true) || 
    (isHotwiring !== undefined && isHotwiring == true)){
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.active = false;`);
        return;
    }
    if(!chatStatus)
    {
        focusChat(true);
        mp.events.call("onOpenChatbox", true);

        // The Anti-FUCK system: try to hide cursor instantly, but if it fails, hide it afterwards! :D very cool
        setTimeout(() => {
            mp.gui.cursor.show(true, false);
        }, 5);
        setTimeout(() => {
            mp.gui.cursor.show(true, false);
        }, 10);
        setTimeout(() => {
            mp.gui.cursor.show(true, false);
        }, 50);
    }
});
mp.events.add("closeChat", () => {         
    focusChat(false);
    mp.events.call("onOpenChatbox", false);  
});
mp.events.add("TogglePlayerChat", (toggle) => {
    activateChat(toggle);
});

mp.events.add('RestartHUD', () => {
    if(ServerUI !== null)
    {
        ServerUI.destroy();
        ServerUI = null;
    }

    ServerUI = mp.browsers.new("package://ServerUI/index.html");
    setTimeout(() => {
        //ServerUI.markAsChat();
        //mp.gui.chat.activate(true);
        //mp.gui.chat.show(true);
        // ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.commands = ${JSON.stringify(CommandsDataJSON)}`);
        // ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.active = false;`)
        // ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.chat.settings = {
        //     opacity: 1,
        //     autoScroll: true,
        // }`);
    }, 1000);
    ServerUI.execute(`gm.$refs.hud.enabled = false;`);
});

let createdTooltips = []; // to keep track of created tooltips / preventing duplicates

mp.events.add('AddTooltip', (key, action, team) => {
    
    if(ServerUI == null) return;
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

    ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.push({
        key: "${key}",
        action: "${action}",
        color: "${color}"
    })`);
});
mp.events.add('RemoveTooltip', (key) => {
    if(ServerUI == null) return;
    if(createdTooltips.indexOf(key) == -1) return;

    ServerUI.execute(`if(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.indexOf(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.filter(function(el){return el.key == "${key}"})[0]) != -1){
        gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.splice(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.indexOf(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.filter(function(el){return el.key == "${key}"})[0]), 1);        
    }`);
    createdTooltips.splice(createdTooltips.indexOf(key), 1);
});

let keyTrunk = true; // true = key trunk, false = key seatbelt displayed

mp.events.add('ToggleTooltips', (status) =>
{
    mp.storage.data.menu.tooltips = status;
    ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.tooltips.enabled = ${status.toString()}`);

    if(status)
    {
        mp.events.callLocal("AddTooltip", "M", "Menu", -1);
        mp.events.callLocal("AddTooltip", String.fromCharCode(curActionMenuBind), "Action Menu", -1);
        mp.events.callLocal("AddTooltip", String.fromCharCode(curVoiceBind), "Voice Chat", -1);
    }
    else {

        createdTooltips.forEach(key => {
            ServerUI.execute(`if(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.indexOf(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.filter(function(el){return el.key == "${key}"})[0]) != -1){
                gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.splice(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.indexOf(gm.$refs.hud.$refs.topRight.$refs.tooltips.tips.filter(function(el){return el.key == "${key}"})[0]), 1);        
            }`);
        });

        createdTooltips = [];
    }
});

mp.events.add("TwoSecondsEvent", () => {

    if(mp.storage.data.menu.RealtimeSpeedo == false){
        if (specState == true && specTarget != null && mp.players.exists(specTarget)) 
        {
            if(specTarget.isInAnyVehicle(false) && specTarget.vehicle != undefined)
            {
                if(!speedo)
                {
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = true;`);
                    speedo = true;
                }
                if(speedoMax != ((mp.game.vehicle.getVehicleModelMaxSpeed(specTarget.vehicle.model) * 3.6) + 25).toFixed(0))
                {
                    speedoMax = ((mp.game.vehicle.getVehicleModelMaxSpeed(specTarget.vehicle.model) * 3.6) + 25).toFixed(0);
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.maxspeed = ${speedoMax};`);
                }
                if(speedoCur != (specTarget.vehicle.getSpeed() * 3.6).toFixed(0))
                {
                    speedoCur = (specTarget.vehicle.getSpeed() * 3.6).toFixed(0);
                    ServerUI.execute(`gm.$refs.BottomRight.$refs.speedo.speed = ${speedoCur};`);
                }
            }
            else if(speedo)
            {
                speedo = false;
                speedoMax = 0;
                speedoCur = 0;
                ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = false;`);
            }
        }
        else {
            if(mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle != undefined && mp.storage.data.menu.Speedo == true)
            {
                if(!speedo)
                {
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = true;`);
                    speedo = true;
                }
                if(speedoMax != ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) + 25).toFixed(0))
                {
                    speedoMax = ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) + 25).toFixed(0);
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.maxspeed = ${speedoMax};`);
                }
                if(speedoCur != (mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0))
                {
                    speedoCur = (mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0);
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.speed = ${speedoCur};`);
                }
            }
            else if(speedo)
            {
                speedo = false;
                speedoMax = 0;
                speedoCur = 0;
                ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = false;`);
            }
        }
    }
    
    if(mp.storage.data.menu.tooltips == true)
    {
        if(mp.players.local.Team != 0 && mp.players.local.Team != 1){
            if(createdTooltips.indexOf("H") != -1) mp.events.callLocal("RemoveTooltip", "H");
        }

        if(mp.players.local.vehicle){
            if(mp.players.local.getVariable("Team") == 1 && chaseRunning)
                if(createdTooltips.indexOf("B") == -1) mp.events.callLocal("AddTooltip", "B", "Silent Siren", 1);
                
            if(createdTooltips.indexOf("L") == -1) mp.events.callLocal("AddTooltip", "L", "Lock", -1);
        }
        else{
            if(createdTooltips.indexOf("L") != -1) mp.events.callLocal("RemoveTooltip", "L");
            if(createdTooltips.indexOf("B") != -1) mp.events.callLocal("RemoveTooltip", "B");     
        }
        if(mp.players.local.getVariable("Team") == 1 && chaseRunning){
            if(createdTooltips.indexOf(String.fromCharCode(curGPSBind)) == -1) 
            {
                mp.events.callLocal("AddTooltip", String.fromCharCode(curGPSBind), "GPS", 1);
            }
            if(createdTooltips.indexOf(String.fromCharCode(curMDCBind)) == -1) 
            {
                mp.events.callLocal("AddTooltip", String.fromCharCode(curMDCBind), "MDC", 1);
            }
        }
        else{
            if(createdTooltips.indexOf(String.fromCharCode(curGPSBind)) != -1) mp.events.callLocal("RemoveTooltip", String.fromCharCode(curGPSBind));
            if(createdTooltips.indexOf(String.fromCharCode(curMDCBind)) != -1) mp.events.callLocal("RemoveTooltip", String.fromCharCode(curMDCBind));
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
                
                /*
                if(mp.players.local.vehicle.getClass() != 8 && mp.players.local.vehicle.model != mp.game.joaat('policeb'))
                {
                    mp.events.callLocal("AddTooltip", "J", "Seatbelt", -1);
                }
                */

                keyTrunk = false;
            }
        }    
    }

    if(mp.storage.data.menu.HUD == false)
    {
        ServerUI.execute(`gm.$refs.hud.enabled = false;`);
    }
    renderNametags = mp.storage.data.menu.nametags;
});



mp.events.add('browserDomReady', (browser) => {
    if(ServerUI != null && browser == ServerUI)
    {
        // Set vars that aren't reset on login and shit. Basically init().
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.enabled = ${mp.storage.data.menu.topRightInfo}; gm.$refs.hud.$refs.topRight.$refs.killFeed.enabled = ${mp.storage.data.menu.killFeed};`);
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.enabled = true;`);
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items = [];`);

        // Initialize miniHUD
        miniHUDVars["bottom"] = ((resolution.y - (getMinimapAnchor().bottomY * resolution.y)) + 0);
        miniHUDVars["left"] = ((getMinimapAnchor().rightX * resolution.x) + 10) + ((mp.storage.data.menu.alwaysExpandedMap == true) ? 162 : 0);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.left = "${miniHUDVars["left"]}px";`);
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.bottom = "${miniHUDVars["bottom"]}px";`);  

        // SPECTATE VARS
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({ 
            name: "ping",
            icon: "fa-stopwatch",
            init: "0 ms",
            color: "#fbbf24"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({ 
            name: "packetloss",
            icon: "fa-minus",
            init: "0.0%",
            color: "#fb923c"
        });`);
        //
        
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({
            name: "jail",
            icon: "fa-ban",
            init: "N/A",
            color: "#fb7185"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({
            name: "visible",
            icon: "fa-globe",
            init: "Visible",
            color: "#60a5fa"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({
            name: "voice",
            icon: "fa-microphone",
            init: "Standby",
            color: "#818cf8"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({
            name: "direction",
            icon: "fa-compass",
            init: "N/A",
            color: "#a3e635"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({
            name: "street",
            icon: "fa-location-dot",
            init: "N/A",
            color: "#4ade80"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.items.push({
            name: "zone",
            icon: "fa-location-crosshairs",
            init: "N/A",
            color: "#34d399"
        });`);

        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.jail[0].show = ${miniHUDVars["jailed"]};`);
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.visible[0].show = false;`);
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.ping[0].show = false;`);
        ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.packetloss[0].show = false;`);

        mp.events.callLocal("ToggleTooltips", mp.storage.data.menu.tooltips);

        if(mp.storage.data.menu.HUD == false)
        {
            ServerUI.execute(`gm.$refs.hud.enabled = false`);
        }
    }
});

mp.events.add('ToggleHud', (toggle) => {
    showHud = toggle;
    
    if(ServerUI != null)
    {
        if(mp.storage.data.menu.HUD == false)
        {
            ServerUI.execute(`gm.$refs.hud.enabled = false`);
            mp.storage.data.menu.HUD = false;
        }

        ServerUI.execute(`gm.$refs.hud.enabled = ${toggle};`);
        mp.storage.data.menu.HUD = toggle;
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
    if(ServerUI != null)
    {
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.killFeed.killFeed = [];`);
    }
});

mp.events.add("pushToKillFeed", (killer, killerColor, weapon, victim, victimColor) => {
    if(ServerUI != null) ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.killFeed.add('${killer}', '${killerColor}', '${weapon}', '${victim}', '${victimColor}');`)
});

mp.events.add("pushToKillFeed2", (victim, color, cause) => {
    if(ServerUI != null) ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.killFeed.add("${victim}", "${color}", "${cause}");`)
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
    
    if(ServerUI != null && (!(mp.players.local.getVariable("pLogged") === undefined || mp.players.local.getVariable("pLogged") == false || mp.players.local.getVariable("InLobby") === undefined)))
    {
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.points = ${mp.players.local.getVariable("Points")};`);
        
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
        
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.lobbyId = "${lobbyStr}";`);

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
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.visible[0].show = ${miniHUDVars["visible"]};`);
        }
        if(voiceString != miniHUDVars["voice"])
        {
            miniHUDVars["voice"] = voiceString;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.voice[0].value = "${miniHUDVars["voice"]}";`);
        }
        if(dirtext != miniHUDVars["direction"])
        {
            miniHUDVars["direction"] = dirtext;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.direction[0].value = "${miniHUDVars["direction"]}";`);
        }
        if(streetName != miniHUDVars["street"])
        {
            miniHUDVars["street"] = streetName;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.street[0].value = "${miniHUDVars["street"]}";`);
        }
        if(zoneName != miniHUDVars["zone"])
        {
            miniHUDVars["zone"] = zoneName;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.zone[0].value = "${miniHUDVars["zone"]}";`);
        }

        if(currentJailTime >= 1)
        {
            if(miniHUDVars["jailed"] != true)
            {
                miniHUDVars["jailed"] = true;
                ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.jail[0].show = ${miniHUDVars["jailed"]};`);
            }
            miniHUDVars["jail"] = jailString;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.jail[0].value = "${miniHUDVars["jail"]}";`);
        }
        else if(miniHUDVars["jailed"] == true)
        {
            miniHUDVars["jailed"] = false;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.jail[0].show = ${miniHUDVars["jailed"]};`);
        }

        if (specState == true && specTarget != null && mp.players.exists(specTarget)) 
        {
            if(miniHUDVars["spec"] == false)
            {
                miniHUDVars["spec"] = true;
                ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.ping[0].show = true;`);
                ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.packetloss[0].show = true;`);

                ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.direction[0].show = false;`);
            }
        
            if(miniHUDVars["packetloss"] != specTarget.getVariable("Packetloss").toFixed(2))
            {
                miniHUDVars["packetloss"] = specTarget.getVariable("Packetloss").toFixed(2);
                ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.packetloss[0].value = "${miniHUDVars["packetloss"]}%"`);
            }
            if(miniHUDVars["ping"] != specTarget.getVariable("Ping"))
            {
                miniHUDVars["ping"] = specTarget.getVariable("Ping");
                ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.ping[0].value = "${miniHUDVars["ping"]} ms"`);
            }
        }
        else if(miniHUDVars["spec"] == true) 
        {
            miniHUDVars["spec"] = false;
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.ping[0].show = false;`);
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.packetloss[0].show = false;`);

            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.$refs.direction[0].show = true;`);
        }
    }
});

function ToggleScoreboard()
{
    if (ServerUI == null) return;

    if(scoreboardToggled)
    {
        scoreboardToggled = false;

        if(updater != null) clearInterval(updater);
        updater = null;

        mp.events.call("TogglePlayerChat", true);
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.disableInput = true;`);
		// ServerUI.execute(`gm.$refs.scoreboard.setPlayers([]);`);
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.enabled = false;`);

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

        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.enabled = true;`);
        ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.disableInput = true;`);
		// ServerUI.execute(`gm.$refs.scoreboard.setPlayers([]);`);

        let notifyscoreboardstr = `toast('Scoreboard Cursor', 'Press <strong>F2</strong> to show the cursor. Click on a player for actions.', 'nothing', 5000, 2);`;
        ServerUI.execute(notifyscoreboardstr);

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

mp.events.add("scoreboard:clickAction", (actionID, playerName) => {
    mp.events.callRemote("ServerConsoleOutput", `scoreboard action ${actionID} on player ${playerName}`);
    mp.events.callRemote("Scoreboard_OnAction", actionID, playerName);
});

function updatePlayers()
{
    if(mp.players.local !== undefined && mp.players.exists(mp.players.local))
        UpdateStatsVars(mp.players.local);

    let updateString = `gm.$refs.hud.$refs.base.$refs.scoreboard.setPlayers([`;

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

        let mutedVar = `VoiceMute${sb.name}`;
        let mutedTog = mp.players.local.getVariable(mutedVar);
        if(mutedTog == undefined) mutedTog = false;

        updateString += `{lid: ${lobbyStr}, squad: ${squad},
        color: 'rgb(${colr}, ${colg}, ${colb})', 
        name: '${sb.name}', level: ${level}, ping: ${ping}, 
        showMute:true, muted: ${mutedTog.toString()}},`;
    });

    updateString += `]);`;

    ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.$refs.global.actions = [
        {
            id: 1,
            name: "Mute",
            icon: "fa-volume-xmark",
            disabledName: "Unmute",
            disabledIcon: "fa-volume",
            disableKey: "muted",
            showKey: "showMute",
        },
    ]`);
    if(ServerUI != null) ServerUI.execute(updateString);
    return;
}

mp.keys.bind(
    0x1B,
    false,
    () => {
        if(ServerUI != null && scoreboardToggled) ToggleScoreboard();
    }
);

mp.keys.bind(0x71, false, function () {
    if(scoreboardToggled)
    {
        if(scoreboardCursor)
        {
            scoreboardCursor = false;
            mp.gui.cursor.show(false, false);
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.disableInput = true;`);
            
            if(!scoreboardBinded) mp.events.callLocal('ScoreboardToggleTyping', false);
        }
        else
        {
            scoreboardCursor = true;
            mp.gui.cursor.show(true, true);
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.scoreboard.disableInput = false;`);

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

    /*
	let insertString = `iziToast.show({
		message: "${msg}",
		icon: "${icon}",
		color: "red",
		timeout: 5000,
		close: true		
	});`;
    */
    let insertString = `toast(null, \`${msg}\`, 'error', 5000);`;
    if(ServerUI != null) ServerUI.execute(insertString);
});

mp.events.add("HUDNotify", (msg, type, icon, close, timeout, orientation, displaymode) => {
    if(!showHud && mp.players.local.getVariable("pLogged") == true) return;
    
    let displayModeNumber = 0;
    if(displaymode == "replace") displayModeNumber = 2;

    /*
    let insertString = `iziToast.show({`;
    insertString += `message: \`${msg}\`, `;
    insertString += `color: "${color}", `;
    insertString += `icon: "${icon}", `;
    insertString += `close: ${close.toString()}, `;
    insertString += `timeout: ${timeout},`;
    if(orientation.length > 1) insertString += `position: \`${orientation}\`, `;
    if(displaymode.length > 1) insertString += `displayMode: \`${displaymode}\`, `;
    insertString += "});";
    */
    let insertString = `toast(null, \`${msg}\`, '${type}', ${timeout}, ${displayModeNumber});`;
    if(ServerUI != null) ServerUI.execute(insertString);
});
// bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
mp.events.add("HUDNotify2", (title, msg, orientation, displaymode) => {
    if(!showHud && mp.players.local.getVariable("pLogged") == true) return;
    
    /*
    let insertString = `iziToast.show({`;
    insertString += `title: \`${title}\`, `;
    insertString += `message: \`${msg}\`, `;
    if(orientation.length > 1) insertString += `position: \`${orientation}\`, `;
    if(displaymode.length > 1) insertString += `displayMode: \`${displaymode}\`, `;
    insertString += "});";
    */
    let insertString = `toast(\`${title}\`, \`${msg}\`, 'nothing', 5000, 2);`;
    if(ServerUI != null) ServerUI.execute(insertString);
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

    if(mp.players.local.weapon != 2725352035){
        if(ServerUI != null){
        let wepData = weaponData.find(w => w.Hash == mp.players.local.weapon);
        if(!wepData) wepData = weaponData.find(w => w.Hash == (mp.players.local.weapon-4294967296));
        
        if(!wepData){
            wepData = {Name:"Undefined Weapon", ImageSrc:"https://assets.gm.miami/gtav/weapons/Baseball-bat-icon.png"};
        }

        let weapon_hash = mp.players.local.weapon; // returns weapon as a hash => uint
        let ammoClip = mp.players.local.getAmmoInClip(weapon_hash); // returns ur ammo in clip
        let ammoWeapon  = mp.players.local.getWeaponAmmo(weapon_hash); // returns ur wep ammo
        let clipSize = mp.game.weapon.getWeaponClipSize(weapon_hash);

        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.equippedWeapon = {
            name: "${wepData.Name}",
            ammo: ${ammoClip},
            maxAmmo: ${ammoWeapon + (clipSize-ammoClip)},
            image: "${wepData.ImageSrc}",
          }`);
        }
    }
    else{
        if(ServerUI != null){
            ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.equippedWeapon = null;`);
        }
    }

    if(showCustomCrosshair){
        if(alwaysShowCustomCrosshair == true){
            if(!customCrosshairOn){
                if(!mp.game.player.isFreeAiming()){         
                    if(!menuToggled)                     
                    {
                        customCrosshairOn = true;
                    }
                }
                else{
                    if(isHoldingSniper()){
                        if(showCustomCrosshairInSniper){
                            customCrosshairOn = true;                           
                        }
                        else{
                            customCrosshairOn = false;                           
                        }
                    }
                    else{
                        customCrosshairOn = true;
                    }
                }
            }
            else{
                if(mp.game.player.isFreeAiming()){                              
                    if(isHoldingSniper()){
                        if(showCustomCrosshairInSniper){
                            customCrosshairOn = true;                          
                        }
                        else{
                            customCrosshairOn = false;                            
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
                    }
                    else{
                        if(isHoldingSniper()){
                            if(showCustomCrosshairInSniper){
                                customCrosshairOn = true;                          
                            }
                            else{
                                customCrosshairOn = false;                                  
                            }
                        }
                        else{
                            customCrosshairOn = true;
                        }
                    }
                }
            }
            else{
                if(customCrosshairOn){
                    customCrosshairOn = false;
                }
            }   
        }
    }

    if(!showReticule)
    {
        mp.game.ui.hideHudComponentThisFrame(14); // RETICULE
        customCrosshairOn = false;
    }
    if(isLockpicking == true || ActionMenuActive == true){
        mp.game.ui.hideHudComponentThisFrame(14); // RETICULE
        customCrosshairOn = false;
    }
    if(customCrosshairOn == true){
        if(!wasCustomCrosshairOn){
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.crosshair.enabled = true;`);
            wasCustomCrosshairOn = true;
        }
        mp.game.ui.hideHudComponentThisFrame(14); // RETICULE
    }
    else{
        if(wasCustomCrosshairOn == true){
            ServerUI.execute(`gm.$refs.hud.$refs.base.$refs.crosshair.enabled = false;`);
            wasCustomCrosshairOn = false;
        }
    }

    if(mp.players.local.getVariable("pLogged") !== undefined && mp.players.local.getVariable("pLogged") == true)
    {       
        if ((resolution.x != mp.game.graphics.getScreenActiveResolution(0,0).x || miniHUDVars["left"] != (((getMinimapAnchor().rightX * resolution.x) + 10)) + ((mp.storage.data.menu.alwaysExpandedMap == true) ? 162 : 0)) && ServerUI != null)
        {
            resolution = mp.game.graphics.getScreenActiveResolution(0,0);
            
            miniHUDVars["bottom"] = ((resolution.y - (getMinimapAnchor().bottomY * resolution.y)) + 0);
            miniHUDVars["left"] = ((getMinimapAnchor().rightX * resolution.x) + 10) + ((mp.storage.data.menu.alwaysExpandedMap == true) ? 162 : 0);

            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.left = "${miniHUDVars["left"]}px";`);
            ServerUI.execute(`gm.$refs.hud.$refs.miniHud.bottom = "${miniHUDVars["bottom"]}px";`);  
        }
        // if (mp.storage.data.menu.alwaysExpandedMap == true)
        // {
        //     mp.game.ui.setRadarBigmapEnabled(true, false);
        // }
        
        if (specState == true && specTarget != null && mp.players.exists(specTarget)) 
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
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = true;`);
                    speedo = true;
                }
                if(mp.storage.data.menu.RealtimeSpeedo == true){
                    if(speedoMax != ((mp.game.vehicle.getVehicleModelMaxSpeed(specTarget.vehicle.model) * 3.6) + 25).toFixed(0))
                    {
                        speedoMax = ((mp.game.vehicle.getVehicleModelMaxSpeed(specTarget.vehicle.model) * 3.6) + 25).toFixed(0);
                        ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.maxspeed = ${speedoMax};`);
                    }
                    if(speedoCur != (specTarget.vehicle.getSpeed() * 3.6).toFixed(0))
                    {
                        speedoCur = (specTarget.vehicle.getSpeed() * 3.6).toFixed(0);
                        ServerUI.execute(`gm.$refs.BottomRight.$refs.speedo.speed = ${speedoCur};`);
                    }
                }
         
            }
            else if(speedo)
            {
                speedo = false;
                speedoMax = 0;
                speedoCur = 0;
                ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = false;`);
            }
        }
        else {
            if(mp.players.local.isInAnyVehicle(false))
            {
                if(!speedo && mp.storage.data.menu.Speedo == true)
                {
                    ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = true;`);
                    speedo = true;
                }
                if(mp.storage.data.menu.RealtimeSpeedo == true){
                    if(speedoMax != ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) + 25).toFixed(0))
                    {
                        speedoMax = ((mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) + 25).toFixed(0);
                        ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.maxspeed = ${speedoMax};`);
                    }
                    if(speedoCur != (mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0))
                    {
                        speedoCur = (mp.players.local.vehicle.getSpeed() * 3.6).toFixed(0);
                        ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.speed = ${speedoCur};`);
                    }
                }
            }
            else if(speedo)
            {
                speedo = false;
                speedoMax = 0;
                speedoCur = 0;
                ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = false;`);
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