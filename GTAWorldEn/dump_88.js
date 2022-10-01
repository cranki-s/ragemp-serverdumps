{
'use strict';
const localPlayer = mp.players.local;
let defaults = { // Default settings that may get overwritten by player settings
    minMenuPartCount: 4, // Minimum 4
    maxMenuPartCount: 12, // Technically unlimited but it starts getting ugly after 10

    minMenuSize: 25,
    maxMenuSize: 75,

    keyCode: 0x58, // X
    baseItemThreshold: 3,
    // If there are less menu items available than baseItemThreshold the
    // baseItems get added to the menu; If there are more (or equal) menu
    // items available than baseItemThreshold, the baseItems get removed
    baseItems: ['phone', 'inventory', 'vget', 'anims', 'advertisements', 'outfit']
};

// https://material.io/resources/icons/?style=baseline
// Place items in the order of importance (items that are lower down the list don't
// appear if there are more than maxMenuPartCount items in the interaction menu);
// items also get sorted based on their order in this dictionary
let possibleElements = { // All possible menu items with the base items at the end

	// element name (back-end JS + controller); description (shown in menu); icon; event (client)
	badge: [ 'Show Badge', 'local_police', 'InteractionMenuClient::ShowBadge' ],
	licenses: [ 'Show Licenses', 'credit_card', 'InteractionMenuClient::ShowLicenses' ],
	lock: [ 'Lock / Unlock', 'lock', 'InteractionMenuClient::LockUnlock' ],
	engine: [ 'Engine', 'electric_car', 'InteractionMenuClient::EngineVehicle' ],
    enterexit: [ 'Enter / Exit', 'sensor_door', 'InteractionMenuClient::EnterExitProperty' ],
    robhouse: [ 'Rob Property', 'electrical_services', 'InteractionMenuClient::RobProperty' ],
    tableaccess: [ 'Manage your table', 'table_restaurant', 'InteractionMenuClient::ManageTable' ],
    set_waypoint: [ 'Mark a waypoint', 'place', 'InteractionMenuClient::SetWaypoint' ],
    complete_init: [ 'Finalize Init.', 'done', 'InteractionMenuClient::CompleteInitialization' ],
    select_car: [ 'Spawn a car', 'drive_eta', 'InteractionMenuClient::SelectMetaCar' ],
    select_gun: [ 'Select gun', 'extension', 'InteractionMenuClient::SelectMetaGun' ],
    suicide: [ 'Suicide', 'accessibility', 'InteractionMenuClient::MetaSuicide' ],
    start_station: [ 'Start station', 'start', 'InteractionMenuClient::StartStation' ],
    close_station: [ 'End station', 'stop', 'InteractionMenuClient::EndStation' ],
    tugnet: ['Raise/Lower Net', 'sailing', 'InteractionMenuClient::UseNetTug'],
    furnitureRobberySell: [ 'Furniture Robbery', 'event_seat', 'InteractionMenuClient::ShowFurnitureRobberySell' ],
    vmenu: [ 'Vehicle Menu', 'directions_car', 'InteractionMenuClient::ShowVehicleMenu' ],
    vinventory: [ 'Vehicle Inventory', 'toys', 'InteractionMenuClient::ShowVehicleInventory' ],
    safeinventory: [ 'Safe Inventory', 'vpn_key', 'InteractionMenuClient::ShowSafeInventory' ],
    containerinv: [ 'Storage Inventory', 'inventory_2', 'InteractionMenuClient::ShowContainerInventory' ],
    helifreeze: [ 'Stay stationary', 'airline_seat_recline_normal', 'InteractionMenuClient::FreezeHelicopter' ],
    metaworld: [ 'MetaWorld', 'sports_esports', 'InteractionMenuClient::ShowMetaWorld' ],
    pmenu: [ 'Property Menu', 'house', 'InteractionMenuClient::ShowPropertyMenu' ],
    piventory: [ 'Property Inventory', 'warehouse', 'InteractionMenuClient::ShowPropertyInventory' ],
    furnishing: [ 'Furnish', 'foundation', 'InteractionMenuClient::ShowPropertyFurnishing' ],
    deposit: [ 'Deposit', 'money_off', 'InteractionMenuClient::ShowDepositUI' ],
    withdraw: [ 'Withdraw', 'attach_money', 'InteractionMenuClient::ShowWithdrawUI' ],
    bmanager: [ 'Manage Business', 'business', 'InteractionMenuClient::ShowBusinessManagementUI' ],
    bmenu: [ 'Business Menu', 'restaurant_menu', 'InteractionMenuClient::ShowBusinessMenuUI' ],
    bjoin: [ 'Join Biz', 'add_business', 'InteractionMenuClient::ShowBusinessJoinUI' ],
    dog: [ 'Dog Menu', 'pets', 'InteractionMenuClient::ShowDogUI' ],
    cat: [ 'Cat Menu', 'pets', 'InteractionMenuClient::ShowCatUI' ],
    weaponattachment: [ 'Weapon Attachment', 'extension', 'InteractionMenuClient::ShowWeaponAttachmentUI' ],
    outfit: [ 'Change Outfit', 'accessibility', 'InteractionMenuClient::ShowOutfitUI' ],
    antitheft: [ 'Anti-Theft', 'settings_remote', 'InteractionMenuClient::AntiTheft' ],
    attach: ['Attach/Detach', 'attach_file', 'InteractionMenuClient::FlatbedAttachment'],
    roadblock: ['Roadblock', 'traffic', 'InteractionMenuClient::RoadBlock'],
    emergency_duty: ['Emergency Duty', 'emergency', 'InteractionMenuClient::EmergencyDuty'],
    dispatch: ['Dispatch', 'wysiwyg', 'InteractionMenuClient::Dispatch'],
    poolpickup: ['Pickup pool', 'radio_button_checked', 'InteractionMenuClient::PoolPickup'],
    // Base items
    phone: ['Phone', 'phone_iphone', 'InteractionMenuClient::TogglePhone'],
    inventory: ['Inventory', 'work', 'InteractionMenuClient::ShowInventory'],
    dropweapon: ['Drop Weapon', 'arrow_circle_down', 'InteractionMenuClient::DropWeapon'],
    vget: ['Vehicles', 'pedal_bike', 'InteractionMenuClient::ShowPlayerVehicles'],
    anims: ['Animations', 'accessibility_new', 'InteractionMenuClient::ShowAnimationWheel'],
    advertisements: ['Advertisements', 'speaker_notes', 'InteractionMenuClient::Advertisements'],
    policeutility: ['Speed Radar', 'settings_remote', 'InteractionMenuClient::SpeedRadar']
};

let currentElements = [];
let params = { // Parameters for when menu items should be added or removed
    hasBadge: false,
    pool: false,
    baseAdded: false,
    closestVeh: null,
    closestPlayer: null,
    closestProperty: null, // Eligible properties must push "Press {KEY} to enter" to the chat
    closestBank: null,
    closestOwnedBiz: null,
    closestJoinedBiz: null,
    closestRecruitingBiz: null,
    closestSafe: null,
    closestContainer: null,
    antiTheft: false,
    petLevel: 0,
    emergencyStatus: false,
    roadblockAccess: false,
    furnitureRobberySell: false,
    tableAccess: false,
    set_waypoint: false,
    complete_init: false,
    start_station: false,
    meta_dimension: false,
    close_station: false,
    station_dm_mode: false,
    station_race_mode: false,

    // Modifiable settings
    playerInteractionDistance: 3.0,
    safeInteractionDistance: 3.0,
    containerInteractionDistance: 3.0,
    vehicleInteractionDistance: 4.0,
    propertyInteractionDistance: 4.0,
    bankInteractionDistance: 5.0,
    ownedBizInteractionDistance: 4.0
};

let menu = { // General CEF controller
    browser: null,
    timer: null,
    enabled: true,
    isVisible: false,
    keysBound: false, // RAGE:MP crashes when unbinding keys that aren't bound so we need a boolean
    chatOpen: false,
    cefOpen: false,
    secondaryCEFOpened: false,

    // Modifiable settings
    timerTick: 500, // miliseconds
    freezeCamera: true,
    freezeAllControls: false
};

// Start update
function runUpdate() { // Runs every menu.timerTick
    if (menu.browser == null) return;
    if (params.closestProperty != null && !nearLocation(params.closestProperty, params.propertyInteractionDistance)) params.closestProperty = null;
    if (params.closestBank != null && !nearLocation(params.closestBank, params.bankInteractionDistance)) params.closestBank = null;
    if (params.closestRecruitingBiz != null && !nearLocation(params.closestRecruitingBiz, params.ownedBizInteractionDistance)) params.closestRecruitingBiz = null;
    if (params.closestOwnedBiz != null && !nearLocation(params.closestOwnedBiz, params.ownedBizInteractionDistance)) params.closestOwnedBiz = null;
    if (params.closestJoinedBiz != null && !nearLocation(params.closestJoinedBiz, params.ownedBizInteractionDistance)) params.closestJoinedBiz = null;
    if (params.closestSafe != null && !nearLocation(params.closestSafe, params.safeInteractionDistance)) params.closestSafe = null;
    if (params.closestContainer != null && !nearLocation(params.closestContainer, params.containerInteractionDistance)) params.closestContainer = null;

    getClosestPlayer();
    getClosestVehicle();
    let localVehicle = localPlayer.vehicle;

    if(localPlayer.dimension >= 10000 || params.meta_dimension) { // MetaWorld Dimension
        AddItem('metaworld');

        if (params.start_station)
            AddItem('start_station');
        if (params.close_station) 
            AddItem('close_station');

        if (params.station_race_mode) 
            AddItem('select_car');
        else if (params.station_dm_mode)
            AddItems(['select_car', 'select_gun', 'suicide']);
        
        return;
    }
    else RemoveItems(['select_car', 'select_gun', 'suicide', 'start_station', 'close_station']);

    if (localVehicle == null) {
        if (params.petLevel == 1) {
            AddItem('cat');
        } else if (params.petLevel == 2) {
            AddItem('dog');
        } else if (params.petLevel == 3) {
            AddItems(['cat', 'dog']);
        }
    } else {
        RemoveItems(['cat', 'dog']);
    }


    if (nearLocation(params.closestProperty, params.propertyInteractionDistance) || localPlayer.dimension > 0 || (menu.closestVeh.entity && menu.closestVeh.distance <= params.vehicleInteractionDistance)) {
        AddItem('lock');

        if((menu.closestVeh.entity && menu.closestVeh.distance <= params.vehicleInteractionDistance)){
            AddItem('vinventory');
        }else{
            RemoveItem('vinventory');
        }

    } else {
        RemoveItems(['lock', 'vinventory']);
    }

    if (getLocalPlayerWeapons().size > 0) {
        AddItem('weaponattachment')
    } else {
        RemoveItem('weaponattachment')
    }

    if (getLocalPlayerWeapons().size > 0) {
        AddItem('dropweapon')
    } else {
        RemoveItem('dropweapon')
    }

    if (localVehicle && (localVehicle.getModel() == 1353720154 || localVehicle.getModel() == 2037834373 || localVehicle.getModel() == 4285564673) && (localVehicle.getPedInSeat(-1) == localPlayer.handle)) {
        AddItems(['attach', 'vmenu']);
    } else {
        RemoveItems(['attach', 'vmenu']);
    }

    if (localVehicle && localVehicle.getClass() == 18){
        AddItems(['policeutility', 'speed_radar']);
    } else {
        RemoveItems(['policeutility', 'speed_radar']);
    }

    if (localVehicle && (localVehicle.getModel() == 2194326579) && (localVehicle.getPedInSeat(-1) == localPlayer.handle)) {
        AddItem('tugnet');
    } else {
        RemoveItem('tugnet');
    }

    if (localVehicle && (localVehicle.getClass() == 15) && localVehicle.getPedInSeat(-1) == localPlayer.handle){
        AddItems(['helifreeze', 'vmenu']);
    } else {
        RemoveItems(['helifreeze', 'vmenu']);

    }

    if (params.antiTheft) {
        AddItem('antitheft');
    } else {
        RemoveItem('antitheft');
    }

    if (localVehicle && localVehicle.getPedInSeat(-1) == localPlayer.handle) {
        AddItems(['engine', 'vmenu', 'vinventory']);
    } else {
        RemoveItems(['engine', 'vmenu', 'vinventory']);
    }

    if (menu.closestPlayer.entity && menu.closestPlayer.distance <= params.playerInteractionDistance) {
        AddItem(params.hasBadge ? 'badge' : 'licenses');
        RemoveItem(params.hasBadge ? 'licenses' : 'badge');
    } else {
        RemoveItems(['licenses', 'badge']);
    }

    if (nearLocation(params.closestProperty, params.propertyInteractionDistance)) {
        AddItem('robhouse');
    } else RemoveItem('robhouse');

    if (nearLocation(params.closestProperty, params.propertyInteractionDistance) || localPlayer.dimension > 0) {
        AddItem('enterexit');
    } else {
        RemoveItem('enterexit');
    }

    if (params.roadblockAccess && localPlayer.dimension == 0) {
        AddItem('roadblock');
    } else {
        RemoveItem('roadblock');
    }

    if (params.tableAccess) {
        AddItem('tableaccess');
    } else {
        RemoveItem('tableaccess');
    }

    if (params.set_waypoint) {
        AddItem('set_waypoint');
    } else {
        RemoveItem('set_waypoint');
    }

    if (params.complete_init) {
        AddItem('complete_init');
    } else {
        RemoveItem('complete_init');
    }

    if (params.furnitureRobberySell && localVehicle) {
        AddItem('furnitureRobberySell');
    } else {
        RemoveItem('furnitureRobberySell');
    }

    if (params.hasBadge) {
        AddItem('dispatch');
    } else {
        RemoveItem('dispatch');
    }

    if (params.emergencyStatus) {
        AddItem('emergency_duty');
    } else {
        RemoveItem('emergency_duty');
    }

    if (params.hasPool) {
        AddItem('poolpickup');
    } else {
        RemoveItem('poolpickup');
    }


    // if (localPlayer.dimension > 0) {
    //     AddItems(['pmenu', 'furnishing', 'piventory', 'metaworld']);
    // } else {
    //     RemoveItems(['pmenu', 'furnishing', 'piventory', 'metaworld']);
    // }

    if (localPlayer.dimension > 0) { // Up - metaworld release
        AddItems(['pmenu', 'furnishing', 'piventory']);
    } else {
        RemoveItems(['pmenu', 'furnishing', 'piventory']);
    }

    if (nearLocation(params.closestBank, params.bankInteractionDistance)) {
        AddItems(['deposit', 'withdraw']);
    } else {
        RemoveItems(['deposit', 'withdraw']);
    }

    if (nearLocation(params.closestSafe, params.safeInteractionDistance)) {
        AddItems(['safeinventory']);
    } else {
        RemoveItems(['safeinventory']);
    }

    if (nearLocation(params.closestContainer, params.containerInteractionDistance)) {
        AddItems(['containerinv']);
    } else {
        RemoveItems(['containerinv']);
    }

    if (nearLocation(params.closestOwnedBiz, params.ownedBizInteractionDistance)) {
        AddItem('bmanager');
    } else {
        RemoveItem('bmanager');
    }

    if (nearLocation(params.closestJoinedBiz, params.ownedBizInteractionDistance)) {
        AddItem('bmenu');
    } else {
        RemoveItem('bmenu');
    }

    if (nearLocation(params.closestRecruitingBiz, params.ownedBizInteractionDistance)) {
        AddItem('bjoin');
    } else {
        RemoveItem('bjoin');
    }
    // Add new items here



    // Always at the end
    if (!params.baseAdded) {
        if (currentElements.length < playerSettings.baseItemThreshold) {
            params.baseAdded = true;
            AddItems(defaults.baseItems);
        }
    } else {
        if (currentElements.length - defaults.baseItems.length >= playerSettings.baseItemThreshold) {
            RemoveItems(defaults.baseItems);
            params.baseAdded = false;
        }
    }

    if (!menu.isVisible && !mp.gui.cursor.visible && menu.secondaryCEFOpened) {
        menu.secondaryCEFOpened = false;
    }
}
// End update


// Start events
// From client
mp.events.add('InteractionMenuClient::ShowBadge', () => {
    mp.events.callRemote('InteractionMenuServer::ShowBadge', menu.closestPlayer.entity);
});

mp.events.add('InteractionMenuClient::ShowLicenses', () => {
    mp.events.callRemote('InteractionMenuServer::ShowLicenses', menu.closestPlayer.entity);
});

mp.events.add('InteractionMenuClient::LockUnlock', () => {
    mp.events.callRemote('InteractionMenuServer::LockUnlock');
});

mp.events.add('InteractionMenuClient::EngineVehicle', () => {
    mp.events.callRemote('InteractionMenuServer::EngineVehicle');
});

mp.events.add('InteractionMenuClient::EnterExitProperty', () => {
    mp.events.callRemote('InteractionMenuServer::EnterExitProperty');
});

mp.events.add('InteractionMenuClient::RobProperty', () => {
    mp.events.callRemote('InteractionMenuServer::RobProperty');
});

mp.events.add('InteractionMenuClient::ManageTable', () => {
    mp.events.callRemote('InteractionMenuServer::ManageTable');
});

mp.events.add('InteractionMenuClient::SetWaypoint', () => {
    mp.events.callRemote('InteractionMenuServer::SetWaypoint');
});

mp.events.add('InteractionMenuClient::CompleteInitialization', () => {
    mp.events.callRemote('InteractionMenuServer::CompleteInitialization');
});

mp.events.add('InteractionMenuClient::StartStation', () => {
    mp.events.callRemote('InteractionMenuServer::StartStation');
});

mp.events.add('InteractionMenuClient::EndStation', () => {
    mp.events.callRemote('InteractionMenuServer::EndStation');
});

mp.events.add('InteractionMenuClient::SelectMetaCar', () => {
    mp.events.callRemote('InteractionMenuServer::SelectMetaCar');
});
mp.events.add('InteractionMenuClient::SelectMetaGun', () => {
    mp.events.callRemote('InteractionMenuServer::SelectMetaGun');
});
mp.events.add('InteractionMenuClient::MetaSuicide', () => {
    mp.events.callRemote('InteractionMenuServer::MetaSuicide');
});

mp.events.add('InteractionMenuClient::ShowMetaWorld', () => {
    mp.events.callRemote('InteractionMenuServer::ShowMetaWorld');
});



mp.events.add('InteractionMenuClient::UseNetTug', () => {
    mp.events.callRemote('InteractionMenuClient::UseNetTug');
});

mp.events.add('InteractionMenuClient::ShowVehicleMenu', () => {
    mp.events.callRemote('InteractionMenuServer::ShowVehicleMenu');
});

mp.events.add('InteractionMenuClient::ShowFurnitureRobberySell', () => {
    mp.events.callRemote('InteractionMenuServer::ShowFurnitureRobberySell');
});

mp.events.add('InteractionMenuClient::ShowVehicleInventory', () => {
    mp.events.callRemote('InteractionMenuServer::ShowVehicleInventory');
});

mp.events.add('InteractionMenuClient::ShowSafeInventory', () => {
    mp.events.callRemote('InteractionMenuServer::ShowSafeInventory');
});

mp.events.add('InteractionMenuClient::ShowContainerInventory', () => {
    mp.events.callRemote('InteractionMenuServer::ShowContainerInventory');
});

mp.events.add('InteractionMenuClient::FreezeHelicopter', () => {
    mp.events.callRemote('InteractionMenuServer::FreezeHelicopter');
});

mp.events.add('InteractionMenuClient::ShowPropertyMenu', () => {
    mp.events.callRemote('InteractionMenuServer::ShowPropertyMenu');
});

mp.events.add('InteractionMenuClient::ShowPropertyInventory', () => {
    mp.events.callRemote('InteractionMenuServer::ShowPropertyInventory');
});

mp.events.add('InteractionMenuClient::ShowPropertyFurnishing', () => {
    mp.events.callRemote('InteractionMenuServer::ShowPropertyFurnishing');
});

mp.events.add('InteractionMenuClient::TogglePhone', () => {
    mp.gui.cursor.show(false, false);
    mp.events.callRemote('InteractionMenuServer::TogglePhone');
    menu.secondaryCEFOpened = true;
});

mp.events.add('InteractionMenuClient::ShowInventory', () => {
    mp.events.callRemote('InteractionMenuServer::ShowInventory');
});

mp.events.add('InteractionMenuClient::ShowPlayerVehicles', () => {
    mp.events.callRemote('InteractionMenuServer::ShowPlayerVehicles');
});

mp.events.add('InteractionMenuClient::AntiTheft', () => {
    mp.events.callRemote('InteractionMenuServer::AntiTheft');
});

mp.events.add('InteractionMenuClient::ShowAnimationWheel', () => {
    mp.gui.cursor.show(false, false);
    mp.events.call('showAnimWheel');
    menu.secondaryCEFOpened = true;
});

mp.events.add('InteractionMenuClient::ShowDepositUI', () => {
    mp.gui.cursor.show(false, false);
    mp.events.callRemote('InteractionMenuServer::ShowDepositUI');
    menu.secondaryCEFOpened = true;
});

mp.events.add('InteractionMenuClient::ShowWithdrawUI', () => {
    mp.gui.cursor.show(false, false);
    mp.events.callRemote('InteractionMenuServer::ShowWithdrawUI');
    menu.secondaryCEFOpened = true;
});

mp.events.add('InteractionMenuClient::FlatbedAttachment', () => {
    mp.events.callRemote('InteractionMenuServer::VehicleAttachment');
});

mp.events.add('InteractionMenuClient::ShowBusinessManagementUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowBusinessManagementUI');
});

mp.events.add('InteractionMenuClient::ShowBusinessMenuUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowBusinessMenuUI');
});

mp.events.add('InteractionMenuClient::ShowBusinessJoinUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowBusinessJoinUI');
});

mp.events.add('InteractionMenuClient::ShowDogUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowDogUI');
});

mp.events.add('InteractionMenuClient::ShowCatUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowCatUI');
});

mp.events.add('InteractionMenuClient::ShowWeaponAttachmentUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowWeaponAttachmentUI');
});

mp.events.add('InteractionMenuClient::DropWeapon', () => {
    mp.events.callRemote('InteractionMenuServer::DropWeapon');
});


mp.events.add('InteractionMenuClient::ShowOutfitUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowOutfitUI');
});

mp.events.add('InteractionMenuClient::Dispatch', () => {
    mp.events.callRemote('InteractionMenuServer::Dispatch');
});

mp.events.add('InteractionMenuClient::RoadBlock', () => {
    mp.events.callRemote('InteractionMenuServer::RoadBlock');
});

mp.events.add('InteractionMenuClient::EmergencyDuty', () => {
    mp.events.callRemote('InteractionMenuServer::EmergencyDuty');
});

mp.events.add('InteractionMenuClient::PoolPickup', () => {
    mp.events.callRemote('InteractionMenuServer::PoolPickup');
});

mp.events.add('InteractionMenuClient::Advertisements', () => {
    mp.events.callRemote('InteractionMenuServer::Advertisements');
});

mp.events.add('InteractionMenuClient::SpeedRadar', () => {
    mp.events.callRemote('InteractionMenuServer::SpeedRadar');
});

// From chat hook
mp.events.add('InteractionMenuClient::PropertyReady', () => {
    params.closestProperty = localPlayer.position;
});

mp.events.add('InteractionMenuClient::BankReady', () => {
    params.closestBank = localPlayer.position;
});

mp.events.add('InteractionMenuClient::BizJoinReady', () => {
    params.closestRecruitingBiz = localPlayer.position;
});

mp.events.add('InteractionMenuClient::SafeReady', () => {
    params.closestSafe = localPlayer.position;
});

mp.events.add('InteractionMenuClient::ContainerReady', () => {
    params.closestContainer = localPlayer.position;
});

// From server
mp.events.add('InteractionMenuClient::ToggleEmergency', (state) => {
    params.emergencyStatus = state;
});

mp.events.add('InteractionMenuClient::ToggleRoadBlock', (state) => {
    params.roadblockAccess = state;
});

mp.events.add('InteractionMenuClient::ToggleTable', (state) => {
    params.tableAccess = state;
});

mp.events.add('InteractionMenuClient::ToggleInitMetaWorld', (state) => {
    params.set_waypoint = state;
    params.complete_init = state;
});

mp.events.add('InteractionMenuClient::ToggleStartStation', (state) => {
    params.start_station = state;
});

mp.events.add('InteractionMenuClient::ToggleMetaDimension', (state) => {
    params.meta_dimension = state;
});

mp.events.add('InteractionMenuClient::ToggleEndStation', (state) => {
    params.close_station = state;
});

mp.events.add('InteractionMenuClient::ToggleDMStation', (state) => {
    params.station_dm_mode = state;
});

mp.events.add('InteractionMenuClient::ToggleRaceStation', (state) => {
    params.station_race_mode = state;
});

mp.events.add('InteractionMenuClient::ToggleFurnitureSell', (state) => {
    params.furnitureRobberySell = state;
});

mp.events.add('InteractionMenuClient::ToggleBadge', (state) => {
    params.hasBadge = state;
});

mp.events.add('InteractionMenuClient::TogglePool', (state) => {
    params.pool = state;
});

mp.events.add('InteractionMenuClient::OwnedBizReady', () => {
    params.closestOwnedBiz = localPlayer.position;
});

mp.events.add('InteractionMenuClient::JoinedBizReady', () => {
    params.closestJoinedBiz = localPlayer.position;
});

mp.events.add('InteractionMenuClient::CanPet', (level) => {
    params.petLevel = level;
});

mp.events.add('InteractionMenuClient::SetAntiTheft', (state) => {
    params.antiTheft = state;
});
// End events


// Start handler
function AddItems(items) {
    if (!(items instanceof Array)) return;
    for (let i = 0; i < items.length; i++) {
        AddItem(items[i]);
    }
}

function AddItem(item) {
    if (menu.browser == null || currentElements.indexOf(item) != -1) return;
    currentElements.push(item);
    menu.browser.execute(`itemAvailable('${item}');`);
}

function RemoveItems(items) {
    if (!(items instanceof Array)) return;
    for (let i = 0; i < items.length; i++) {
        RemoveItem(items[i]);
    }
}

function RemoveItem(item) {
    if (menu.browser == null) return;
    let elementIndex = currentElements.indexOf(item);
    if (elementIndex == -1) return;

    currentElements.splice(elementIndex, 1);
    menu.browser.execute(`itemNotAvailable('${item}');`);
}
// End handler

// Start init
// This should probably only be called once
mp.events.add('InteractionMenuClient::Create', createInteractionMenu);

function createInteractionMenu() {
    if (menu.browser != null) return;

    loadSettings();
    if (!menu.enabled) return;

    menu.browser = mp.browsers.new("package://gtalife/InteractionMenu/index.html");
    menu.browser.execute(`setPossibleItems(${JSON.stringify(possibleElements)});`);
    menu.browser.execute(`setSettings(${playerSettings.menuSize}, ${playerSettings.confirmOnHoverRelease}, ${playerSettings.sortItems}, ${playerSettings.useQueue}, ${defaults.minMenuPartCount}, ${defaults.maxMenuPartCount}, ${playerSettings.animateOpen});`);

    menu.timer = setInterval(runUpdate, menu.timerTick);
    runUpdate(); // Run an update right now
}

// This should probably never be called
mp.events.add('InteractionMenuClient::Destroy', destroyInteractionMenu);

function destroyInteractionMenu() {
    if (menu.browser == null) return;

    clearInterval(menu.timer);

    menu.browser.destroy();
    menu.browser = null;

    currentElements.length = 0;
    params.baseAdded = false;
}

mp.events.add('InteractionMenuClient::Reload', reloadInteractionMenu);

function reloadInteractionMenu() {
    destroyInteractionMenu();
    createInteractionMenu();
}

function showMenu() {
    if (menu.browser == null || menu.isVisible || menu.chatOpen || menu.cefOpen || mp.gui.cursor.visible) return;

    // BOOL _SET_CURSOR_LOCATION(float x, float y);
    mp.game.invoke('0xFC695459D4D0E219', 0.5, 0.5);

    menu.isVisible = true;
    menu.browser.execute(`toggleMenu(${menu.isVisible});`);
    mp.gui.cursor.show(menu.freezeAllControls, true);

    if (playerSettings.firstOpen) {
        playerSettings.firstOpen = false;
        setStorage(storageKeys.firstOpen, false);

        mp.gui.chat.push("!{DodgerBlue}INFO: !{White}You've just opened the interaction menu, use !{LimeGreen}/menu !{White}to customize it and change the key that opens it.");
    }
}

function hideMenu() {
    if (menu.browser == null || !menu.isVisible) return;
    if (!menu.secondaryCEFOpened) mp.gui.cursor.show(false, false);

    menu.isVisible = false;
    menu.browser.execute(`toggleMenu(${menu.isVisible});`);
}
// End init


// Start utility
function vectorDistance(one, two) {
    let difference = new mp.Vector3(one.x - two.x, one.y - two.y, one.z - two.z);
    let distance = Math.sqrt(Math.pow(difference.x, 2) + Math.pow(difference.y, 2) + Math.pow(difference.z, 2));
    return Math.abs(distance);
}

function getClosestVehicle() {
    let closestVehicle = null;
    let previousOffset = 9999;

    mp.vehicles.forEachInStreamRange(currentVehicle => {
        if (currentVehicle) {
            let distanceToVehicle = vectorDistance(localPlayer.position, currentVehicle.position);

            if (distanceToVehicle < previousOffset) {
                closestVehicle = currentVehicle;
                previousOffset = distanceToVehicle;
            }
        }
    });

    menu.closestVeh = {
        entity: closestVehicle,
        distance: previousOffset
    };
}

function getClosestPlayer() {
    let closestPlayer = null;
    let previousOffset = 9999;

    mp.players.forEachInStreamRange(currentPlayer => {
        if (currentPlayer) {
            let distanceToPlayer = vectorDistance(localPlayer.position, currentPlayer.position);

            if (localPlayer.handle != currentPlayer.handle && distanceToPlayer < previousOffset) {
                closestPlayer = currentPlayer;
                previousOffset = distanceToPlayer;
            }
        }
    });

    menu.closestPlayer = {
        entity: closestPlayer,
        distance: previousOffset
    };
}

function nearLocation(location, maxDistance) {
    if (location == null) return false;
    return vectorDistance(localPlayer.position, location) <= maxDistance;
}

function isValidNumber(number) {
    let converted = parseInt(number, 10);

    return {
        valid: !isNaN(converted),
        value: isNaN(converted) ? 0 : converted
    };
}

function isValidMenuSize(size) {
    let number = isValidNumber(size);
    return number.valid && number.value >= defaults.minMenuSize && number.value <= defaults.maxMenuSize;
}

function isValidThresholdValue(value) {
    let number = isValidNumber(value);
    return number.valid && number.value >= defaults.baseItemThreshold && number.value <= defaults.maxMenuPartCount;
}

function convertState(state) { // Negating because we favor true instead of false as a default
    return !(state == false || state == "false" || state == "no" || state == "disable");
}
// End utility

// Start storage
let playerSettings = { // Overwritten from storage
    firstOpen: true,
    keyCode: defaults.keyCode,
    menuSize: 50,

    confirmOnHoverRelease: true,
    animateOpen: true,
    sortItems: true,
    useQueue: true,
    baseItemThreshold: defaults.baseItemThreshold
}

let storageKeys = {
    firstOpen: 'uimenu_firstopen',
    state: 'uimenu_disabled',
    keyCode: 'uimenu_key',
    menuSize: 'uimenu_size',

    hoverConfirm: 'uimenu_confirm_with_hover',
    animateOpen: 'uimenu_animate_open',
    sortItems: 'uimenu_sort',
    useQueue: 'uimenu_queue',
    threshold: 'uimenu_threshold'
};

function setStorage(variable, value) {
    mp.storage.data[variable] = value;
    mp.storage.flush();
}

function loadSettings() {
    // Unbind first
    if (menu.keysBound) {
        mp.keys.unbind(playerSettings.keyCode, true, showMenu);
        mp.keys.unbind(playerSettings.keyCode, false, hideMenu);

        menu.keysBound = false;
    }

    // Don't load anything if the menu is disabled
    let menuDisabled = mp.storage.data[storageKeys.state];
    menu.enabled = !menuDisabled;
    if (!menu.enabled) return;

    // Load other settings
    let firstOpen = mp.storage.data[storageKeys.firstOpen];
    if (firstOpen != undefined) playerSettings.firstOpen = convertState(firstOpen);

    let menuSize = mp.storage.data[storageKeys.menuSize];
    if (menuSize != undefined && isValidMenuSize(menuSize)) playerSettings.menuSize = menuSize;

    let hoverConfirm = mp.storage.data[storageKeys.hoverConfirm];
    let animateOpen = mp.storage.data[storageKeys.animateOpen]
    let sortItems = mp.storage.data[storageKeys.sortItems];
    let useQueue = mp.storage.data[storageKeys.useQueue];

    if (hoverConfirm != undefined) playerSettings.confirmOnHoverRelease = convertState(hoverConfirm);
    if (animateOpen != undefined) playerSettings.animateOpen = convertState(animateOpen);
    if (sortItems != undefined) playerSettings.sortItems = convertState(sortItems);
    if (useQueue != undefined) playerSettings.useQueue = convertState(useQueue);

    let threshold = mp.storage.data[storageKeys.threshold];
    if (threshold != undefined && isValidThresholdValue(threshold)) playerSettings.baseItemThreshold = threshold;

    // Bind key last
    let customKeyValue = defaults.keyCode;
    let customKey = mp.storage.data[storageKeys.keyCode];
    if (customKey != undefined && customKey != "null" && customKey != "default") {
        let num = isValidNumber(customKey);
        if (num.valid) {
            customKeyValue = num.value;
        } else {
            if (customKey.length == 1) {
                customKeyValue = customKey.toUpperCase().charCodeAt(0);
            } else {
                switch (customKey.toLowerCase()) { // Add other custom keys based on demand
                    case 'alt':
                    case 'menu':
                        customKeyValue = 0x12;
                        break;
                    case 'ctrl':
                    case 'control':
                        customKeyValue = 0x11;
                        break;
                    default:
                        customKeyValue = defaults.keyCode;
                        mp.gui.chat.push("!{Red}ERROR: !{White}Invalid keyboard button.");
                }
            }
        }
    }

    playerSettings.keyCode = customKeyValue;
    mp.keys.bind(playerSettings.keyCode, true, showMenu);
    mp.keys.bind(playerSettings.keyCode, false, hideMenu);
    menu.keysBound = true;
}

mp.events.add('InteractionMenuClient::Enable', () => {
    if (menu.enabled) return;

    menu.enabled = true;

    setStorage(storageKeys.state, !menu.enabled);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have !{LimeGreen}enabled !{White}the interaction menu. It will now load.`);
});

mp.events.add('InteractionMenuClient::Disable', () => {
    if (!menu.enabled) return;

    menu.enabled = false;

    setStorage(storageKeys.state, !menu.enabled);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have !{Red}disabled !{White}the interaction menu. It will no longer load.`);
});

mp.events.add('InteractionMenuClient::SetKey', (key) => {
    if (!key) {
        mp.gui.chat.push("!{Red}ERROR: !{White}Invalid keyboard button.");
        return;
    }
    key = key.toUpperCase();

    setStorage(storageKeys.keyCode, key)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have changed the menu key to !{LimeGreen}${key}!{White}.`);
});

mp.events.add('InteractionMenuClient::SetMenuSize', (size) => {
    if (!isValidMenuSize(size)) {
        mp.gui.chat.push(`!{Red}ERROR: !{White}Invalid menu size. The parameter must be a number between !{LimeGreen}${defaults.minMenuSize} !{White}and !{LimeGreen}${defaults.maxMenuSize}!{White}.`);
        return;
    }

    playerSettings.menuSize = size;

    setStorage(storageKeys.menuSize, size)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have changed the menu size to !{LimeGreen}${size}!{White}.`);
});

mp.events.add('InteractionMenuClient::SetHoverConfirm', (state) => {
    state = convertState(state);
    playerSettings.confirmOnHoverRelease = state;

    setStorage(storageKeys.hoverConfirm, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have ${state ? '!{LimeGreen}enabled' : '!{Red}disabled'} !{White}the hover confirm.`);
});

mp.events.add('InteractionMenuClient::SetAnimateOpen', (state) => {
    state = convertState(state);
    playerSettings.animateOpen = state;

    setStorage(storageKeys.animateOpen, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have ${state ? '!{LimeGreen}enabled' : '!{Red}disabled'} !{White}the opening animation.`);
});

mp.events.add('InteractionMenuClient::SetSortStatus', (state) => {
    state = convertState(state);
    playerSettings.sortItems = state;

    setStorage(storageKeys.sortItems, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have ${state ? '!{LimeGreen}enabled' : '!{Red}disabled'} !{White}the item sort.`);
});

mp.events.add('InteractionMenuClient::SetQueueStatus', (state) => {
    state = convertState(state);
    playerSettings.useQueue = state;

    setStorage(storageKeys.useQueue, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have ${state ? '!{LimeGreen}enabled' : '!{Red}disabled'} !{White}the queue.`);
});

mp.events.add('InteractionMenuClient::SetThresholdValue', (value) => {
    if (!isValidThresholdValue(value)) {
        mp.gui.chat.push(`!{Red}ERROR: !{White}Invalid threshold value. The parameter must be a number between !{LimeGreen}${defaults.baseItemThreshold} !{White}and !{LimeGreen}${defaults.maxMenuPartCount}!{White}.`);
        return;
    }

    playerSettings.baseItemThreshold = value;

    setStorage(storageKeys.threshold, value)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}INFO: !{White}You have changed the threshold value to !{LimeGreen}${value}!{White}.`);
});
// End storage


// Start RAGE:MP
mp.events.add('render', () => {
    if (!menu.isVisible || !menu.freezeCamera) return;

    // Disable game camera movement
    mp.game.controls.disableControlAction(1, 1, true); // INPUT_LOOK_LR
    mp.game.controls.disableControlAction(1, 2, true); // INPUT_LOOK_UD

    // Disable quick swapping weapons, aiming, and attacking
    mp.game.controls.disableControlAction(1, 16, true); // INPUT_SELECT_NEXT_WEAPON
    mp.game.controls.disableControlAction(1, 17, true); // INPUT_SELECT_PREV_WEAPON

    mp.game.controls.disableControlAction(1, 24, true); // INPUT_ATTACK
    mp.game.controls.disableControlAction(1, 25, true); // INPUT_AIM

    mp.game.controls.disableControlAction(1, 140, true); // INPUT_MELEE_ATTACK_LIGHT
    mp.game.controls.disableControlAction(1, 141, true); // INPUT_MELEE_ATTACK_HEAVY
    mp.game.controls.disableControlAction(1, 142, true); // INPUT_MELEE_ATTACK_ALTERNATE

    mp.game.controls.disableControlAction(1, 257, true); // INPUT_ATTACK2
    mp.game.controls.disableControlAction(1, 263, true); // INPUT_MELEE_ATTACK1
    mp.game.controls.disableControlAction(1, 264, true); // INPUT_MELEE_ATTACK2
});

// Start state checks
mp.events.add('changeChatState', (state) => {
    menu.chatOpen = state;
});

mp.events.add('browser_created', () => {
    menu.cefOpen = true;
});

mp.events.add('browser_destroyed', () => {
    menu.cefOpen = false;
});

mp.events.add('cef_opened_client', (state) => {
    menu.cefOpen = state;
});

mp.events.add('setCefActive', (state) => {
    menu.cefOpen = state;
});
// End state checks

// Start keys
// Hide menu on Esc, Tab, T
mp.keys.bind(0x1B, true, hideMenu); // Esc
mp.keys.bind(0x09, true, hideMenu); // Tab
mp.keys.bind(0x54, true, hideMenu); // T
// End keys

// End RAGE:MP
}