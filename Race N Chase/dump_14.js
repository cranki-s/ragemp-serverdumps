{
menuToggled = false;

var FirstTimeMenuOpen = true;

var ActiveCrosshairProfileUUID = "";

let lastMenuToggle = Date.now();

if(typeof mp.storage.data.menu == "undefined" || typeof mp.storage.data.menu.HUD == "undefined")
{
    mp.storage.data.menu = {};
    mp.storage.data.menu.topRightInfo = true;
    mp.storage.data.menu.gameProgress = true;
    mp.storage.data.menu.killFeed = true;
    mp.storage.data.menu.alwaysExpandedMap = false;
    mp.storage.data.menu.updateRate = 200;
    mp.storage.data.menu.myweather = -1;
    mp.storage.data.menu.tooltips = true;
    mp.storage.data.menu.nametags = true;
    mp.storage.data.menu.HUD = true;
    mp.storage.data.menu.OOCauto = false;
    mp.storage.data.menu.EventMusic = true;
    mp.storage.data.menu.monitoring = false;
    mp.storage.data.menu.VoiceMode = 0;
    mp.storage.data.menu.InactiveChatOpacity = 0.5;
    mp.storage.data.menu.ActiveChatOpacity = 1.0;
    mp.storage.data.menu.ShowInactiveChat = true;
    mp.storage.data.menu.AutoLogin = true;
    mp.storage.data.menu.RealtimeSpeedo = false;
    mp.storage.data.menu.Speedo = true;
    mp.storage.data.menu.loadingscreens = true;

    mp.storage.flush();
}

mp.events.add('RestartMenu', () => {
    if(ServerUI !== null)
    {
        ServerUI.destroy();
        ServerUI = null;
    }

    ServerUI = mp.browsers.new("package://ServerUI/index.html");
    ServerUI.execute(`gm.$refs.mainMenu.enabled = false;`);

    ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.logTypes = [
        { label: "Sessions", value: 2 },
        { label: "Admin", value: 1 },
        { label: "Admin Records", value: 3 },
      ];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.filterType = {label: "Admin Records", value: 3};`);

    mp.events.callLocal("MenuToggleTyping", false);
});

mp.events.add("setSelectedProfile", (profileID, settings) => {
    //settings.enable , settings.alwaysOn , settings.onSnipers
    ActiveCrosshairProfileUUID = profileID;

    mp.events.callRemote("Crosshair_SetProfile", profileID);
});
mp.events.add("saveCrosshairProfiles", (profileData) => {
    mp.events.callRemote("Crosshair_SaveProfiles", profileData);

    let prData = JSON.parse(profileData);
    if(prData != undefined){
        let currentProfile = undefined;
        for(let i = 0 ; i < prData.length; i++){
            if(prData[i].uuid == ActiveCrosshairProfileUUID){
                currentProfile = prData[i];
                break;
            }
        }
        if(currentProfile){
            
            alwaysShowCustomCrosshair = currentProfile.settings.alwaysOn;
            showCustomCrosshairInSniper = currentProfile.settings.onSnipers;
            showCustomCrosshair = currentProfile.settings.enabled;
        }
    }
});

mp.events.add("LoadCrosshairProfiles", (profileData, activeProfile) => {
    ServerUI.execute(`gm.$refs.helpers.$refs.states.setCrosshair('profiles', ${profileData});`);
    ServerUI.execute(`gm.$refs.helpers.$refs.states.setCrosshair('selectedProfile', '${activeProfile}');`);

    ActiveCrosshairProfileUUID = activeProfile;
});

mp.events.add("Menu_AddClan", (clanID, cname, tag, desc, banner, isOpen, players, maxPlayers, kills, deaths, wins, ownerName) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.clansList.clans.push(
        {
            id: ${clanID},
            name: "${cname}",
            tag: "${tag}",
            description: "${desc}",
            banner:
              "${banner == "default" ? "https://www.igta5.com/images/official-artwork-blitz-play.jpg" : banner}",
            open: ${isOpen.toString()},
            players: ${players},
            maxplayers: ${maxPlayers},
            owner: "${ownerName}",
            stats: {
              kills: ${kills},
              deaths: ${deaths},
              wins: ${wins},
            },
        });`);
});
mp.events.add("joinClan", (clanSQLID) => {
    mp.events.callRemote("Clan_OnRequestJoinClan", clanSQLID);
});
mp.events.add("kickClanMember", (memberSQLID) => {
    mp.events.callRemote("Clan_OnRequestKickPlayer", memberSQLID);
});
mp.events.add("setClanRank", (memberSQLID, tier) => {
    mp.events.callRemote("Clan_OnRequestChangeTier", memberSQLID, tier);
});

mp.events.add("invitePlayerToClan", (playerName) => {
    mp.events.callRemote("Clan_OnRequestInvitePlayer", playerName);
});

mp.events.add("requestLeaveClan", () => {
    mp.events.callRemote("OnRequestLeaveClan");
});
/*
    CLAN SETTING IDs and VALUES

    [1] => Clan Access
    (VALUES) => 0 - Invite-only ; 1 - Public
    [2] => Force Clan Tag
    (VALUES) => true/false
    [3] => Copchase Partnering
    (VALUES) => true/false
*/
mp.events.add("changeClanSettings", (settingID, value) => {
    let numValue = Number(value); // be careful in the future if a setting isn't bool nor number

    mp.events.callRemote("Clan_OnRequestChangeSetting", settingID, numValue);
});

mp.events.add("Menu_RemoveClanMember", (memberID) => {
    ServerUI.execute(`
        if(gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.find(m => m.id == ${memberID})){
            gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.splice(gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.indexOf(gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.find(m => m.id == ${memberID})), 1);
        }
    `);
});
mp.events.add("Menu_UpdateClanMember", (memberID, memberName, memberTier, memberLevel) => {
    ServerUI.execute(`
        if(gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.find(m => m.id == ${memberID})){
            gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members[gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.indexOf(gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.find(m => m.id == ${memberID}))] = {
                id: ${memberID},
                name: '${memberName}',
                level: ${memberLevel},
                tier: ${memberTier}
            }
        }

    `);
});

mp.events.add("Menu_InitClanSettings", (clanAccess, copchasePartnering, forceTag) => {
    ServerUI.execute(`
        gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.settingsTab.copchasePartnering = ${copchasePartnering.toString()};   
        gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.settingsTab.forceClanTag = ${forceTag.toString()};    
        gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.settingsTab.clanAccess = "${clanAccess}";   
    `);
});
mp.events.add("Menu_UpdateClanSetting", (type, value) => {
    switch(type){
        case "access":{ 
            ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.settingsTab.clanAccess = "${value}";`);
            break;
        }
        case "partnering":{ 
            ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.settingsTab.copchasePartnering = ${value.toString()};`);
            break;
        }
        case "forcetag":{ 
            ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.settingsTab.forceClanTag = ${value.toString()};`);
            break;
        }
    }
});

mp.events.add("Menu_AddClanMember", (memberID, memberName, memberTier, memberLevel, isOnline) => {

    ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members.push(
        {
            id: ${memberID},
            name: '${memberName}',
            level: ${memberLevel},
            tier: ${memberTier},
            online: ${isOnline.toString()}
        });`);
});
mp.events.add("Menu_ClearClanMembers", () => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.membersTab.members = [];`);
});

mp.events.add("Menu_DisableClanCreatorLoading", () => {
    ServerUI.execute()
});

mp.events.add("Menu_UpdateClanStats", (weekKills, totalKills, weekWins) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.$refs.statsTab.stats = [
        {
            icon: "fa-crosshairs",
            title: "Week Kills",
            value: ${weekKills}
        },
        {
            icon: "fa-skull",
            title: "Total Kills",
            value: ${totalKills}
        },
        {
            icon: "fa-trophy",
            title: "COTW Wins",
            value: ${weekWins}
        }
    ]`);
});

mp.events.add("createClan", (cname, tag, desc) => {
    mp.events.callRemote("OnRequestCreateClan", cname, tag, desc);
});
mp.events.add("UpdateMenuClanTab", () => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.clansList.clans = [];`);
    setTimeout(() => {
        mp.events.callRemote("Menu_RequestClansList");
        ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.name = "${mp.players.local.getVariable("ClanName")}"`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.createdAt = "${mp.players.local.getVariable("ClanCreated")}"`);
        mp.events.callRemote("Menu_InitializeMyClanTab");  
    }, 100);

});


mp.events.add("render", () => {
    if(menuToggledLate == true){
        mp.game.controls.disableControlAction(0, 200, true); // prevent menu from opening when pressing ESC for chat 
    }    
});
mp.keys.bind(0x1B, true, function() { // ESC key
    if(menuToggled == true){
        ToggleMenu();     
    }
});

function menuSetting_getOptionNameFromValue(type, value){
    switch(type){
        case "weather":{
            switch(Number(value)){
                case -1: return "Dynamic";
                case 0: return "Sunny";
                case 2: return "Cloudy";
                case 4: return "Foggy";
                case 6: return "Rain";
                case 7: return "Thunderstorm";
                case 9: return "Snowfall";
                default: return "Unknown";
            }
            break;
        }
        case "voicemode":{
            switch(Number(value)){
                case 0: return "Nearby";
                case 1: return "Team";
                case 2: return "Squad";
                case 3: return "Disabled";
            }         
            break;   
        }
        case "activechatopacity":{
            return `${Number(value)*100}`;      
            break;   
        }
        case "inactivechatopacity":{
            return `${Number(value)*100}`;      
            break;   
        }
    }
}

mp.events.add("UpdateMenuStatsTab", (email, admin, points, dpoints, dlevel, derbywins, escapes, arrests,
                                     kills, deaths, kdr, playtime, warns, discordlinked) => {

    ServerUI.execute(`gm.$refs.mainMenu.$refs.profileTab.$refs.statsTab.stats = [
            {
                icon: "fa-mailbox",
                title: "E-Mail",
                value: "${email}",
            },
            {
                icon: "fa-shield-quartered",
                title: "Admin",
                value: "${admin}",
            },
            {
                icon: "fa-coins",
                title: "Points",
                value: "${points}",
            },
            {
                icon: "fa-treasure-chest",
                title: "Donator Points",
                value: "${dpoints}",
            },
            {
                icon: "fa-gem",
                title: "Donator Level",
                value: "${dlevel}",
            },
            {
                icon: "fa-truck-monster",
                title: "Derby Wins",
                value: "${derbywins}",
            },
            {
                icon: "fa-person-to-portal",
                title: "Escapes",
                value: "${escapes}",
            },
            {
                icon: "fa-handcuffs",
                title: "Arrests",
                value: "${arrests}",
            },
            {
                icon: "fa-crosshairs",
                title: "Kills",
                value: "${kills}",
            },
            {
                icon: "fa-skull",
                title: "Deaths",
                value: "${deaths}",
            },
            {
                icon: "fa-scale-unbalanced",
                title: "K/D Ratio",
                value: "${kdr}",
            },
            {
                icon: "fa-clock",
                title: "Play Time",
                value: "${playtime} hours",
            },
            {
                icon: "fa-triangle-exclamation",
                title: "Warns",
                value: "${warns}",
            },
            {
                icon: "fa-clouds",
                title: "Discord",
                value: "${(discordlinked == true ? "Your account is verified." : "Your account isn't verified! (/verify)")}",
            },
        ]`);

    // `gm.$refs.mainMenu.$refs.profileTab.$refs.statsTab.stats = {
    //     {
    //         icon: "fa-crosshairs",
    //         title: "Kills",
    //         value: 15,
    //       },
    // }`
});

function ToggleMenu()
{
    if(MDCActive !== undefined && MDCActive == true){
        ToggleMDC();
    }
    if((VehicleSpawnerActive !== undefined && VehicleSpawnerActive == true) ||
        (WeaponEditorActive !== undefined && WeaponEditorActive == true) ||
        (ActionMenuActive !== undefined && ActionMenuActive == true) ||
        (ClothingEditorActive !== undefined && ClothingEditorActive == true) ||
        (isHotwiring !== undefined && isHotwiring == true)){
        return;
    }
    if(scoreboardToggled)
    {
        ToggleScoreboard();
    }
    if(ServerUI != null && Date.now() - lastChatToggle >= 500 && chatStatus == false && mp.players.local.getVariable("pLogged") !== undefined 
        && mp.players.local.getVariable("pLogged") == true && Date.now() - lastMenuToggle >= 1000)
    {
        lastMenuToggle = Date.now();
        traceLastFunc(`[Menu] Attempt open/M key`);

        menuToggled = !menuToggled;

        //if(ServerUI != null) ServerUI.execute(`gm.miniHud = ${!menuToggled};`);
        //ServerUI.execute(`gm._pStores.globals.isMainMenuOpen = ${menuToggled};`);
        ServerUI.execute(`gm.$refs.hud.enabled = ${menuToggled ? 'false' : mp.storage.data.menu.HUD.toString()};`);
        ServerUI.execute(`gm.$refs.mainMenu.enabled = ${menuToggled}`);
        mp.events.callRemote("OnToggleMenu", menuToggled);
        mp.gui.cursor.show(menuToggled, menuToggled);
        activateChat(!menuToggled);
        mp.events.callRemote("RequestStatsForStatsTab");
        UpdateStatsVars(mp.players.local);

        ServerUI.execute('gm.$refs.mainMenu.$refs.logsTab.isLoading = false;');

        if(menuToggled){
            ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.clansList.clans = [];`);
            mp.events.callRemote("Menu_RequestClansList");
            ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.name = "${mp.players.local.getVariable("ClanName")}"`);
            ServerUI.execute(`gm.$refs.mainMenu.$refs.clansTab.$refs.myClan.createdAt = "${mp.players.local.getVariable("ClanCreated")}"`);
            ServerUI.execute(`gm.$refs.mainMenu.$refs.profileTab.name = '${mp.players.local.name}'`);
            ServerUI.execute(`gm.$refs.mainMenu.$refs.profileTab.createdAt = '${mp.players.local.getVariable("RegisterDate")}'`);

            

            // Testing for now, loads all clan data such as members, clan kills, etc.
            mp.events.callRemote("Menu_InitializeMyClanTab");

            if(FirstTimeMenuOpen){
                FirstTimeMenuOpen = false;

                mp.events.callRemote("Menu_RequestClanSettings");
            }
            menuToggledLate = true;
        }
        else{
            setTimeout(() => {menuToggledLate = false;}, 500);
        }
        

        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.categories = [
            {
                name: "Game",
                settings:[
                    {
                        id: 12,
                        type: 4,
                        name: "myweather",
                        label: "Weather",
                        description: "Changes the weather displayed only on your screen.",
                        options: [
                          {
                              label: "Dynamic",
                              value: "-1",
                          },
                          {
                            label: "Sunny",
                            value: "0",
                          },
                          {
                            label: "Cloudy",
                            value: "2",
                          },
                          {
                            label: "Foggy",
                            value: "4",
                          },
                          {
                            label: "Rain",
                              value: "6",
                          },
                          {
                            label: "Thunderstorm",
                              value: "7",
                          },
                          {
                            label: "Snowfall",
                              value: "9",
                          },
                        ]
                    },
                    {
                        id: 14,
                        type: 1,
                        name: "autojoinopt",
                        label: "Autojoin",
                        description: "Toggles whether you will be put in copchase rounds or not."
                    },
                    {
                        id: 15,
                        type: 1,
                        name: "eventmusic",
                        label: "Event Music",
                        description: "Toggles whether background music will play in events or not."
                    },
                    {
                        id: 26,
                        type: 1,
                        name: "carradio",
                        label: "GTA Car Radio",
                        description: "Toggles whether you'll hear the in-game car radio music. NOTE: Due to GTAV sync, if the driver has disabled radio, you won't hear anything too!"
                    },
                    {
                        id: 27,
                        type: 1,
                        name: "loadingscreens",
                        label: "Enable Loading Screens",
                        description: "Toggles the loading screens (e.g. the one at beginning of copchase) on or off. Disable this if you are experiencing issues with long loading screens."
                    },
                    {
                        id: 21,
                        type: 1,
                        name: "autologintog",
                        label: "Auto Login",
                        description: "Automatically log in to this account - eliminates the need to enter your login info."
                    },
                    {
                        id: 22,
                        type: 1,
                        name: "realtimespeedo",
                        label: "Real-time Speedometer Updates",
                        description: "If toggled on, the speedometer will update in real-time (every frame). This option might have a bad effect on your performance."
                    }
                ]
            },
            {
                name: "Keybinds",
                settings: [
                    {
                        id: 7,
                        type: 3,
                        name: "vcbind",
                        label: "Push To Talk",
                        description: "Click to change the push to talk key."
                      },
                      {
                        id: 8,
                        type: 3,
                        name: "gpsbind",
                        label: "GPS Key",
                        description: "This is the key used to toggle GPS."
                      },
                      {
                        id: 11,
                        type: 3,
                        name: "bigmapbind",
                        label: "Expanded Minimap",
                        description: "Toggles the larger minimap view."
                      },
                      {
                        id: 23,
                        type: 3,
                        name: "actionmenubind",
                        label: "Quick-Action Menu",
                        description: "Opens the quick-action menu when held down, closes it when key is let go."
                      },
                      {
                        id: 24,
                        type: 3,
                        name: "mdcbind",
                        label: "Police MDC",
                        description: "Toggles the police Mobile Data Computer."
                      }
                ]
            },
            {
                name: "Display",
                settings: [
                    {
                        id: 9,
                        type: 1,
                        name: "hud",
                        label: "User Interface",
                        description: "Completely disable/enable the HUD."
                    },
                    {
                      id: 1,
                      type: 1,
                      name: "tri",
                      label: "Top Right Info",
                      description: "This includes RnC Logo, Player Count, Current Lobby ID, Clock."
                    },
                    {
                      id: 2,
                      type: 1,
                      name: "kf",
                      label: "Kill Feed",
                      description: "This includes Kill Feed."
                    },
                    {
                      id: 3,
                      type: 1,
                      name: "gp",
                      label: "Game Progress",
                      description: "This includes In-Game Progress Timer."
                    },
                    {
                      id: 4,
                      type: 1,
                      name: "bigmap",
                      label: "Expanded Minimap",
                      description: "Toggle permanently expanded minimap."
                    },
                    {
                        id: 5,
                        type: 1,
                        name: "tooltips",
                        label: "Tooltips",
                        description: "Enable/disable tooltips."
                    },
                    {
                        id: 10,
                        type: 1,
                        name: "nametags",
                        label: "Nametags",
                        description: "Enable/disable nametags."
                    },
                    {
                        id: 25,
                        type: 1,
                        name: "togspeedo",
                        label: "Speedometer",
                        description: "Enable/disable car speedometer."
                    },
                    {
                        id: 6,
                        type: 2,
                        name: "updr",
                        label: "Update Rate",
                        description: "How fast should blips & UI segments update.",
                        options: [
                          {
                            name: "Slow",
                            value: "1000",
                          },
                          {
                            name: "Normal",
                            value: "200",
                          },
                          {
                            name: "Fast",
                            value: "10",
                          },
                        ]
                    },
                    {
                        id: 16,
                        type: 1,
                        name: "monitor",
                        label: "FPS/Ping Monitoring",
                        description: "Toggles whether your FPS & ping will be displayed in the top right corner."
                    }
                ]
            },
            {
                name: "Chat",
                settings: [
                    {
                        id: 13,
                        type: 1,
                        name: "oocauto",
                        label: "Auto OOC",
                        description: "Automatically send all text messages to the global OOC chat, so you don't have to type /o every time."
                    },
                    {
                        id: 17,
                        type: 4,
                        name: "voicemode",
                        label: "Voice Mode",
                        description: "Sets the voice channel in which you speak. (SHORTCUT: N+TAB)",
                        default: "Nearby",
                        options: [
                          {
                            label: "Nearby",
                            value: "0",
                          },
                          {
                            label: "Team",
                            value: "1",
                          },
                          {
                            label: "Squad",
                            value: "2",
                          },
                          {
                            label: "Disabled",
                            value: "3",
                          },
                        ]
                    },
                    {
                        id: 18,
                        type: 4,
                        name: "activechatopacity",
                        label: "Active Chat Opacity",
                        description: "Changes the opacity of the chat while it's in 'active' state, a.k.a. while typing or receiving messages.",
                        default: "${(mp.storage.data.menu.ActiveChatOpacity == undefined ? "100" : (mp.storage.data.menu.ActiveChatOpacity*100).toString())}",
                        options: [
                          {
                            label: "100",
                            value: "1",
                          },
                          {
                            label: "75",
                            value: "0.75",
                          },
                          {
                            label: "50",
                            value: "0.5",
                          },
                          {
                            label: "25",
                            value: "0.25",
                          },
                        ]
                    },
                    {
                        id: 19,
                        type: 4,
                        name: "inactivechatopacity",
                        label: "Inactive Chat Opacity",
                        description: "Changes the opacity of the chat while it's in 'inactive' state, a.k.a. when some time passes without any new messages.",
                        default: "${(mp.storage.data.menu.InactiveChatOpacity == undefined ? "50" : (mp.storage.data.menu.InactiveChatOpacity*100).toString())}",
                        options: [
                          {
                            label: "100",
                            value: "1",
                          },
                          {
                            label: "75",
                            value: "0.75",
                          },
                          {
                            label: "50",
                            value: "0.5",
                          },
                          {
                            label: "25",
                            value: "0.25",
                          },
                        ]
                    },
                    {
                        id: 20,
                        type: 1,
                        name: "showinactivechat",
                        label: "Show Inactive Chat",
                        description: "Toggles whether the chat will be visible or not while it's in the 'inactive' state."
                    },
                ]
            }
        ]`);

        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.tri[0].value = ${mp.storage.data.menu.topRightInfo}`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.gp[0].value = ${mp.storage.data.menu.gameProgress};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.tooltips[0].value = ${mp.storage.data.menu.tooltips};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.kf[0].value = ${mp.storage.data.menu.killFeed};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.nametags[0].value = ${mp.storage.data.menu.nametags};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.hud[0].value = ${mp.storage.data.menu.HUD};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.bigmap[0].value = ${mp.storage.data.menu.alwaysExpandedMap};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.updr[0].value = ${mp.storage.data.menu.updateRate};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.togspeedo[0].value = ${mp.storage.data.menu.Speedo};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Display[0].$refs.monitor[0].value = ${mp.storage.data.menu.monitoring};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Keybinds[0].$refs.vcbind[0].value = "${String.fromCharCode(curVoiceBind)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Keybinds[0].$refs.gpsbind[0].value = "${String.fromCharCode(curGPSBind)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Keybinds[0].$refs.bigmapbind[0].value = "${String.fromCharCode(curMapBind)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Keybinds[0].$refs.actionmenubind[0].value = "${String.fromCharCode(curActionMenuBind)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Keybinds[0].$refs.mdcbind[0].value = "${String.fromCharCode(curMDCBind)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.myweather[0].value = "${menuSetting_getOptionNameFromValue("weather", mp.storage.data.menu.myweather)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.autojoinopt[0].value = ${mp.storage.data.menu.AutoJoin};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.eventmusic[0].value = ${mp.storage.data.menu.EventMusic};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.autologintog[0].value = ${mp.storage.data.menu.AutoLogin};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.realtimespeedo[0].value = ${mp.storage.data.menu.RealtimeSpeedo};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.carradio[0].value = ${mp.storage.data.radiotoggle};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Game[0].$refs.loadingscreens[0].value = ${mp.storage.data.menu.loadingscreens};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Chat[0].$refs.oocauto[0].value = ${mp.storage.data.menu.OOCauto};`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Chat[0].$refs.voicemode[0].value = "${menuSetting_getOptionNameFromValue("voicemode", mp.storage.data.menu.VoiceMode)}";`);
        
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Chat[0].$refs.activechatopacity[0].value = "${menuSetting_getOptionNameFromValue("activechatopacity", mp.storage.data.menu.ActiveChatOpacity)}";`);       
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Chat[0].$refs.inactivechatopacity[0].value = "${menuSetting_getOptionNameFromValue("inactivechatopacity", mp.storage.data.menu.InactiveChatOpacity)}";`);
        ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.$refs.Chat[0].$refs.showinactivechat[0].value = ${mp.storage.data.menu.ShowInactiveChat.toString()};`);
    }
}

mp.keys.bind(0x4D, false, ToggleMenu);
/*
mp.keys.bind(
    0x1B,
    false,
    () => {
        if(ServerUI != null && menuToggled) ToggleMenu();
    }
);*/

mp.events.add("MenuToggleTyping", (state) => {
    if(state)
    {
        mp.keys.unbind(0x4D, false, ToggleMenu);
    }
    else
    {
        mp.keys.bind(0x4D, false, ToggleMenu);
    }
});

// ID 69420 ==> Custom Crosshair Toggle | ID 69421 ==> Always On Crosshair |  ID 69422 ==> Sniper Custom or Default crosshair
mp.events.add("MenuChangeSettings", (id, value) => 
{
    if(id == 1)
    {
        mp.storage.data.menu.topRightInfo = value;
    }
    else if(id == 9)
    {
        mp.storage.data.menu.HUD = value;
        ServerUI.execute(`gm.$refs.hud.enabled = ${value.toString()}`);
    }
    else if(id == 10)
    {
        mp.storage.data.menu.nametags = value;
        renderNametags = value;
    }
    else if(id == 2)
    {
        mp.storage.data.menu.killFeed = value;
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.killFeed.enabled = ${value.toString()}`);
    }
    else if(id == 3)
    {
        mp.storage.data.menu.gameProgress = value;
    }
    else if(id == 4)
    {
        //mp.events.callLocal("playerCommand", `bigmap ${value}`);
        mp.storage.data.menu.alwaysExpandedMap = value;
        mp.game.ui.setRadarBigmapEnabled(value, false);
    }
    else if(id == 5)
    {
        mp.storage.data.menu.tooltips = value;
        mp.events.callLocal("ToggleTooltips", mp.storage.data.menu.tooltips);
    }
    else if(id == 6)
    {
        mp.events.callLocal("playerCommand", `updaterate ${value}`);
        //mp.storage.data.menu.updateRate = value;
        //updateRate = value;
    }
    else if(id == 7)
    {
        mp.events.callLocal("playerCommand", `voicebind ${value}`);
    }
    else if(id == 8)
    {
        mp.events.callLocal("playerCommand", `gpsbind ${value}`);
    }
    else if(id == 11)
    {
        mp.events.callLocal("playerCommand", `bigmapbind ${value}`);
    }
    else if(id == 12)
    {
        mp.storage.data.menu.myweather = value;
        mp.events.callRemote("SetPlayerPrivateWeather", value);
    }
    else if(id == 13)
    {
        mp.storage.data.menu.OOCauto = value;
        autoOOC = mp.storage.data.menu.OOCauto;
        mp.events.callRemote("SetAutoOOC", autoOOC);
    }
    else if(id == 14)
    {
        mp.storage.data.menu.AutoJoin = value;
        mp.players.local.AutoJoin = value
        mp.events.callRemote("SetAutoJoin", mp.players.local.AutoJoin, true);
    }
    else if(id == 15)
    {
        mp.storage.data.menu.EventMusic = value;
        mp.players.local.EventMusic = value;
    }
    else if(id == 16)
    {
        mp.storage.data.menu.monitoring = value;
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.monitorEnabled = ${value}`);
    }
    else if(id == 17)
    {
        mp.storage.data.menu.VoiceMode = value;
        mp.events.callRemote("SetVoiceMode", value, true);
    }
    else if(id == 18)
    {
        mp.storage.data.menu.ActiveChatOpacity = value;
        increaseChatOpacity(500);
    }
    else if(id == 19)
    {
        mp.storage.data.menu.InactiveChatOpacity = value;
        increaseChatOpacity(500);
    }
    else if(id == 20)
    {
        mp.storage.data.menu.ShowInactiveChat = value;
        increaseChatOpacity(500);
    }
    else if(id == 21)
    {
        mp.storage.data.menu.AutoLogin = value;
        mp.events.callRemote("Server_ToggleAutoLogin", value);
    }
    else if(id == 22)
    {
        mp.storage.data.menu.RealtimeSpeedo = value;
    }
    else if(id == 23)
    {
        changeActionMenuBind(value);
    }
    else if(id == 24)
    {
        changeMDCBind(value);
    }
    else if(id == 25){
        mp.storage.data.menu.Speedo = value;
        ServerUI.execute(`gm.$refs.hud.$refs.bottomRight.$refs.speedo.enabled = ${value};`);
    }
    else if(id == 26){
        mp.storage.data.radiotoggle = value;
        radioToggle = value;
    }
    else if(id == 27){
        mp.storage.data.menu.loadingscreens = value;
    }

    if(ServerUI != null)
    {
        ServerUI.execute(`gm.$refs.hud.$refs.topRight.$refs.info.enabled = ${mp.storage.data.menu.topRightInfo}; gm.killFeed = ${mp.storage.data.menu.killFeed};`);
    }

    mp.storage.flush();
});

mp.events.add("Menu_UpdateLevelXP", (first_time = false) => {
    setTimeout(() => {
        UpdateStatsVars();
    }, (first_time ? 1000 : 1));
})

mp.events.add("PutPlayerInLobby", (lobbyID, password) => {
    mp.events.callRemote("Server_RequestLobbySwitch", lobbyID, password);
    ToggleMenu();
});

mp.events.add("RequestJoinMinigame", (ID) => {
    mp.events.callRemote("Server_RequestMinigameJoin", ID);
    ToggleMenu();
});

mp.events.add("MenuSelectVehicle", (model, team) => {
    mp.events.callRemote("MenuSelectedVehicle", model, team);
});

mp.events.add("MenuSelectLoadout", (name, team) => {
    mp.events.callRemote("MenuSelectedLoadout", name, team);
});

mp.events.add("UpdateMenuMinigames", (arenas, currentMinigame) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.minigamesTab.games = [];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.minigamesTab.currentMinigame = ${currentMinigame};`);
    
    let menuItems = JSON.parse(arenas);
    for(let i = 0; i < menuItems.length; i++)
    {
        let insertString = `gm.$refs.mainMenu.$refs.minigamesTab.games.push({`;
        insertString += `"id": ${menuItems[i][0]}, `;
        insertString += `"name": "${menuItems[i][1]}", `;
        insertString += `"background": "${menuItems[i][2]}", `;
        insertString += `"players": ${menuItems[i][3]}, `;
        insertString += `"maxplayers": ${menuItems[i][4]}, `;
        if(menuItems[i][5].length > 1) insertString += `"gamemode": "${menuItems[i][5]}", `;
        if(menuItems[i][6].length > 1) insertString += `"description": "${menuItems[i][6]}", `;
        
        insertString += "});";

        ServerUI.execute(insertString);
    }
});

mp.events.add("AddMenuItem", (name, type, owned, price, description, max) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.inventoryTab.items.push({
        name: "${name}",
        type: "${type}",
        owned: ${owned},
        price: ${price},
        max: ${max},
        description: "${description}"
    });`);
});
mp.events.add("UpdateMaxMenuItem", (type, max) => {
    ServerUI.execute(`
        if(gm.$refs.mainMenu.$refs.inventoryTab.items.find(i => i.type == "${type}") != undefined){
            gm.$refs.mainMenu.$refs.inventoryTab.items.find(i => i.type == "${type}").max = ${max};
        }
        else{
            console.log("Failed to find item of type ${type} in the menu!");
        }
    `);
});
mp.events.add("UpdateMenuItem", (type, owned) => {
    ServerUI.execute(`
        if(gm.$refs.mainMenu.$refs.inventoryTab.items.find(i => i.type == "${type}") != undefined){
            gm.$refs.mainMenu.$refs.inventoryTab.items.find(i => i.type == "${type}").owned = ${owned};
        }
        else{
            console.log("Failed to find item of type ${type} in the menu!");
        }
    `);
});
// called by menu:
mp.events.add("MenuBuyItem", (name) => {
    mp.events.callRemote("Menu_RequestBuyItem", name);
});
// --------------------

mp.events.add("UpdateMenuVehicles", (vehicles, currentCopCar, currentFugiCar) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.vehiclesTab.$refs.police.vehicles = [];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.vehiclesTab.$refs.fugitive.vehicles = [];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.vehiclesTab.$refs.police.selectedModel = "${currentCopCar}";`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.vehiclesTab.$refs.fugitive.selectedModel = "${currentFugiCar}";`);

    // Vehicle Data
    // Model, Name, Background, Energy, Price, Locked
    let menuItems = JSON.parse(vehicles);
    for(let i = 0; i < menuItems.length; i++)
    {
        let insertString = "";
        if(menuItems[i][0] == 0) insertString = `gm.$refs.mainMenu.$refs.vehiclesTab.$refs.fugitive.vehicles.push({`;
        else if(menuItems[i][0] == 1) insertString = `gm.$refs.mainMenu.$refs.vehiclesTab.$refs.police.vehicles.push({`;
        
        insertString += `"model": "${menuItems[i][1]}", `;
        insertString += `"name": "${menuItems[i][2]}", `;
        insertString += `"background": "${menuItems[i][3]}", `;
        insertString += `"locked": ${menuItems[i][4]}, `;
        if(menuItems[i][5].length > 1) insertString += `"speed": "${menuItems[i][5]}", `;
        if(menuItems[i][6].length > 1) insertString += `"requirements": ${menuItems[i][6]},`;
        insertString += "});";

        ServerUI.execute(insertString);
    }
});

mp.events.add("UpdateMenuLoadouts", (loadouts, currentCopLoadout, currentFugiLoadout) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.loadoutsTab.$refs.police.loadouts = [];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.loadoutsTab.$refs.fugitive.loadouts = [];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.loadoutsTab.$refs.police.selectedLoadout = "${(currentCopLoadout == "?" ? "Default" : currentCopLoadout)}";`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.loadoutsTab.$refs.fugitive.selectedLoadout = "${(currentFugiLoadout == "?" ? "Default" : currentFugiLoadout)}";`);

    // Loadout Data
    // Name, Locked, Background, Requirements, Weapons
    let menuItems = JSON.parse(loadouts);
    for(let i = 0; i < menuItems.length; i++)
    {
        let insertString = "";
        if(menuItems[i][0] == 0) insertString = `gm.$refs.mainMenu.$refs.loadoutsTab.$refs.fugitive.loadouts.push({`;
        else if(menuItems[i][0] == 1) insertString = `gm.$refs.mainMenu.$refs.loadoutsTab.$refs.police.loadouts.push({`;
        
        insertString += `"name": "${menuItems[i][1]}", `;
        insertString += `"background": "${menuItems[i][2]}", `;
        insertString += `"locked": ${menuItems[i][3]}, `;
        insertString +=  menuItems[i][4];
        insertString +=  menuItems[i][5];
        insertString += "});";
        ServerUI.execute(insertString);
    }
});

mp.events.add("UpdateMenuLobbies", (lobbies, currentLobby) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.lobbiesTab.lobbies = [];`);
    ServerUI.execute(`gm.$refs.mainMenu.$refs.lobbiesTab.currentLobby = ${currentLobby};`);

    // Lobby Data
    // ID, Name, Background, Gamemode, Password, Players, MaxPlayers, Description
    let menuItems = JSON.parse(lobbies);
    for(let i = 0; i < menuItems.length; i++)
    {
        let insertString = `gm.$refs.mainMenu.$refs.lobbiesTab.lobbies.push({`;
        insertString += `"id": ${menuItems[i][0]}, `;
        insertString += `"name": "${menuItems[i][1]}", `;
        insertString += `"background": "${menuItems[i][2]}", `;
        insertString += `"gamemode": "${menuItems[i][3]}", `;
        if(menuItems[i][4].length > 1) insertString += `"password": "${menuItems[i][4]}", `;
        insertString += `"players": ${menuItems[i][5]}, `;
        insertString += `"maxplayers": ${menuItems[i][6]}`;
        if(menuItems[i][7].length > 1) insertString += `, "description": "${menuItems[i][7]}"`;
        insertString += "});";

        ServerUI.execute(insertString);
    }
});

// mp.events.add("SaveCrosshair", (crData) => {
//     mp.storage.data.menu.CrosshairData = crData;
//     ServerUI.execute(`gm.crosshair.layers = ${crData}`);

//     mp.storage.flush();
// });
// mp.events.add("LoadCrosshair", () => {
//     if (mp.storage.data.menu.CrosshairData !== undefined) {
//         ServerUI.execute(`gm.crosshair.layers = ${mp.storage.data.menu.CrosshairData}`);
//         ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.settings.$refs.crosshair.layers = ${mp.storage.data.menu.CrosshairData}`);
//     }
//     else {
//         mp.storage.data.menu.CrosshairData = "[]";
//         ServerUI.execute(`gm.crosshair.layers = []`);
//         ServerUI.execute(`gm.$refs.mainMenu.$refs.settingsTab.settings.$refs.crosshair.layers = []`);
//     }
// });
}