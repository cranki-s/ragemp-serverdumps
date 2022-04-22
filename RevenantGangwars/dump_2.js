var sharedVariables = {
    localPlayer: mp.players.local,
    drawUI: false,
    drawFiringMode: false,
    drawTurfUI: false,
    selectionActive: false,
    garageActive: false,
    teamName: "",
    firingModeText: "",
    moneyText: "",
    moneyDiffText: "",
    moneyDiffTime: 0,
    killFeedItems: [],
    currentVehicleText: "",
    turfText: "",
    killstreakText: "~HUD_COLOUR_MENU_YELLOW~Killstreak: ~w~0"
};

var sharedDrawingVariables = new Proxy({}, {
    set: function(target, property, value) {
        let current = target[property];
        target[property] = value;

        mp.events.call("onDrawingVariableChange", property, current, value);
        return true;
    }
});

const toLoad = [
    "scripts/changeDetect",
    "scripts/notifications",
    "scripts/teams",
    "scripts/spawnProtection",
    "scripts/killFeed",
    "scripts/turfs",
    "scripts/killstreaks",
    "scripts/discord",
    "scripts/admin",
    "scripts/main",
    "scripts/keybinds",
    "scripts/hud",
    "scripts/animations",
    "scripts/seats",
    "scripts/headshotDamage",
    "scripts/outfitEditor",
    "scripts/sandbox",
	
    //general
    "chat-ui",
    "general/nativeui",
    "general/playerlist",
    "general/ClothesMenu",
    "general/local-chat",
    "general/weaponspawner",
    "general/CarTuner",

    //cef
    "cef/statsUI/index.js",
    "cef/login/login.js",
    "cef/banScreen/index.js",
    "cef/mainmenu/index.js",
    "cef/screenshot/index.js",
    "cef/customoutfitmenu/index.js",
    "cef/customoutfitmenu1/index.js",
    "cef/speedometer/index.js",
    "cef/outfitsUI/saintsOutfits",
    "cef/outfitsUI/narcosOutfits",
    "cef/outfitsUI/marabuntaOutfits",
    "cef/outfitsUI/aztecasOutfits",
    "cef/outfitsUI/talibanOutfits",
    "cef/outfitsUI/losreyesOutfits",
    "cef/outfitsUI/bloodsOutfits",
    "cef/outfitsUI/cripsOutfits",
    "cef/garage/index.js",

    "ui/teamSelectionText",
    "ui/attachedToMinimap",
    "ui/killFeed",
];

toLoad.forEach((file) => {
    try {
        require(file);
    } catch (e) {
        mp.gui.chat.push(`Failed to load "${file}".`);
    }
});

mp.game.audio.setAudioFlag("LoadMPData", true);

// Disables default RageMP Chat
mp.gui.chat.show(false);

// Initialize chatbox CEF, mark it as default server chat
const chatbox = mp.browsers.new('package://chat-ui/index.html');
chatbox.markAsChat();