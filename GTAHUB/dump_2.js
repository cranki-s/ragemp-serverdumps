// wrap callRemote into a new event:
// onRemote (callRemoteHash ...args)
// that's because I can't hook callRemote
// directly on nodeJS (for joebill)


/** Wrapper for require that also sets the profiler identifier */
function requireProfiled(name) {
    mp.profiler.setIdentifier(name);
    return require(name);
}

require("profiler.js") // must go first to catch all events

requireProfiled("net_protocol.js"); // implements the code to communicate to the backend
requireProfiled("rageextension.js"); // implements necessary extensions for RAGE
requireProfiled("streaming_notify.js");

// entities
requireProfiled('vehicles.js');
requireProfiled('objects.js');
requireProfiled('blips.js');
requireProfiled('actors.js');
requireProfiled('labels.js');
requireProfiled('pickups.js');
requireProfiled('particles.js');
requireProfiled('sound.js');
requireProfiled('cruisecontrol.js');
requireProfiled('trailersync.js');
requireProfiled('sirens_silencer.js');
requireProfiled('fire.js');
requireProfiled('helicam.js');
requireProfiled('planeradar.js');
requireProfiled('ui_radargun.js');

// authoring and tools
requireProfiled('fpscounter.js');
requireProfiled('skycam.js');
requireProfiled('items.js');
requireProfiled('clothesedit.js');
requireProfiled('board.js');
requireProfiled('flipcoin.js');
requireProfiled('crouch.js');
requireProfiled('recorder.js');
requireProfiled('items_camera.js');
requireProfiled("disable_tumble.js");
requireProfiled('countdown.js');

// ui
requireProfiled('ui_notifications.js');
requireProfiled('ui_loginscreen.js');
requireProfiled('ui_charactercustomization.js');
requireProfiled('ui_phone.js');
requireProfiled('ui_chat.js');
requireProfiled('ui_cfgeditor.js');
requireProfiled('ui_menu.js');
requireProfiled('ui_inventory.js');
requireProfiled('ui_hud.js');
requireProfiled('ui_confirmation.js');
requireProfiled('ui_speedometer.js');
requireProfiled('ui_itemmenu.js');
requireProfiled('ui_dialog.js');
requireProfiled('ui_locationhud.js');
requireProfiled('ui_adminduty.js');
requireProfiled('ui_welcomescene.js');
requireProfiled('ui_url.js');
requireProfiled('ui_license.js');
requireProfiled('ui_warnings.js');
requireProfiled('ui_padlock.js');
requireProfiled('ui_headchat.js');
requireProfiled('ui_whitelist.js');
requireProfiled('ui_entityrotation.js');
requireProfiled('ui_roulette.js');
requireProfiled('ui_dailyreward.js');

// player calls
requireProfiled('player.js');
requireProfiled('player_noclip.js');
requireProfiled('player_voice.js');
requireProfiled('player_animation.js');
requireProfiled('player_attachments.js');
requireProfiled('player_attachmenteditor.js');
requireProfiled('player_health.js');
requireProfiled('player_camera.js');
requireProfiled('player_input.js');
requireProfiled('fingerpointing.js');
requireProfiled('carry.js');
requireProfiled('player_spec.js');
//requireProfiled('player_performance.js');


// games
requireProfiled('games.js');
requireProfiled('game_dance.js');
requireProfiled('game_race.js');
requireProfiled('game_dummy.js');
requireProfiled('game_skillcheck.js');

// map and ipls
requireProfiled('garajerace.js');
requireProfiled('cayoperico.js');
requireProfiled('vespucci_pd.js');

mp.profiler.setIdentifier("index");

// limit players to 170
mp.players.maxStreamed = 170;

// limit vehicles to 128
mp.vehicles.maxStreamed = 128;

mp.nametags.enabled = false; // hide nametags
mp.gui.cursor.visible = false; // hide cursor on join
mp.game.graphics.transitionFromBlurred(100); // fix blur (in case it was enabled on server restart)

// detect ALT F4 to close game
let altF4 = false;

// Those disable the wandering camera.
// From https://rage.mp/forums/topic/4008-disable-the-interest-zoom-camera/
mp.setInterval(() => {
    mp.game.invoke('0x9E4CFFF989258472');
    mp.game.invoke('0xF4F2C0D4EE209E20');
}, 25000);

// Remove apartments IPLs from Pillbox Hill for own maps
mp.game.streaming.removeIpl('hei_hw1_blimp_interior_11_dlc_apart_high_new_milo_');
mp.game.streaming.removeIpl('hei_hw1_blimp_interior_12_dlc_apart_high_new_milo_');

mp.rpc("index:eval", (code) => {
    eval(code);
});

mp.rpc("index:eval_verbose", (code) => {
    let result = eval(code);
    mp.game.graphics.notify(JSON.stringify(result));
});

mp.rpc('index:set_weather', (newWeather, timeTaken) => {
    mp.game.gameplay.setWeatherTypeOverTime(newWeather, timeTaken);
});

// Enable interior props for some interiors
mp.game.interior.enableInteriorProp(247553, 'security_high');
mp.game.interior.refreshInterior(247553);

mp.players.local.setAlpha(255); // alpha survives restarts

// hide/show hud with F7
mp.keys.bind(0x76/*F7*/, true, () => {
    toggleHud(!isHudToggled());
});

// detect if player open rage menu
mp.keys.bind(0x70/*F1*/, true, () => {
    mp.events.originalCallRemote("playerToggleRageMenu");
});

// check if player cancel ALT F4 menu to close GTA V
mp.keys.bind(0x1b/*ESC*/, true, () => {
    if (altF4) {
        altF4 = false;
        mp.events.originalCallRemote("playerToggleRageMenu");
    }
});

// disable autoaim
var whitelistWeapons = {
    "1": 2508868239, //bat
    "2": 1141786504, //Golf Club
    "3": 2725352035, //Fist
    "4": 3756226112, //Switchblade
    "5": 1317494643, //Hammer
    "6": 2484171525, //Poolcuee
    "7": 419712736, //Wrench
    "8": 3713923289, //Machete
    "9": 2460120199, //Dagger
    "10": 4192643659, //Bottle
    "11": 2343591895, //Flashlight
    "12": 4191993645, //Hatchet
    "13": 3638508604, //Knuckle
    "14": 2578778090, //Knife
    "15": 3756226112, //Switchblade
    "16": 1737195953, //Nightstick
    "17": 3441901897, //Battle Axe
    "18": 940833800 //Stone Hatchet
};
mp.events.add('render', () => {
    if (Object.values(whitelistWeapons).includes(mp.players.local.weapon)) {
        mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local.id, 1);
    } else {
        mp.game.invoke('0x5C8B2F450EE4328E', mp.players.local.id, 0);
    }

    let alt = mp.keys.isDown(0X12);
    let f4 = mp.keys.isDown(0x73);
    if (alt && f4 && !altF4) {
        altF4 = true;
        mp.events.originalCallRemote("playerToggleRageMenu");
    }
});




mp.profiler.clearIdentifier();

setInterval(() => {
    mp.game.graphics.pushScaleformMovieFunction(1,"SETUP_HEALTH_ARMOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(3);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}, 500);
