{
﻿'use strict';
const localPlayer = mp.players.local;
let defaults = { // Default settings that may get overwritten by player settings
    minMenuPartCount: 4, // Minimum 4
	maxMenuPartCount: 10, // Technically unlimited but it starts getting ugly after 10

    minMenuSize: 25,
    maxMenuSize: 75,

    keyCode: 0x58, // X
    speakCode: 0x4E, // N
    baseItemThreshold: 3,
    // If there are less menu items available than baseItemThreshold the
    // baseItems get added to the menu; If there are more (or equal) menu
    // items available than baseItemThreshold, the baseItems get removed
    baseItems: [ 'phone', 'inventory', 'vget', 'anims', 'advertisements' ]
};

// https://material.io/resources/icons/?style=baseline
// Place items in the order of importance (items that are lower down the list don't
// appear if there are more than maxMenuPartCount items in the interaction menu);
// items also get sorted based on their order in this dictionary
let possibleElements = { // All possible menu items with the base items at the end
	// element name (back-end JS + controller); description (shown in menu); icon; event (client)
	badge: [ 'Показать значок', 'local_police', 'InteractionMenuClient::ShowBadge' ],
	licenses: [ 'Показать лицензии', 'credit_card', 'InteractionMenuClient::ShowLicenses' ],
	lock: [ 'Закрыть / Открыть', 'lock', 'InteractionMenuClient::LockUnlock' ],
	engine: [ 'Двигатель', 'electric_car', 'InteractionMenuClient::EngineVehicle' ],
    enterexit: [ 'Войти / Выйти', 'sensor_door', 'InteractionMenuClient::EnterExitProperty' ],
    tugnet: ['Поднять / Опустить сети', 'sailing', 'InteractionMenuClient::UseNetTug'],
    vmenu: [ 'Меню транспорта', 'directions_car', 'InteractionMenuClient::ShowVehicleMenu' ],
    helifreeze: [ 'Застыть в воздухе', 'airline_seat_recline_normal', 'InteractionMenuClient::FreezeHelicopter' ],
    pmenu: [ 'Меню свойств', 'house', 'InteractionMenuClient::ShowPropertyMenu' ],
    furnishing: [ 'Система мебели', 'foundation', 'InteractionMenuClient::ShowPropertyFurnishing' ],
    deposit: [ 'Депозит', 'money_off', 'InteractionMenuClient::ShowDepositUI' ],
    withdraw: [ 'Вывести', 'attach_money', 'InteractionMenuClient::ShowWithdrawUI' ],
    bmanager: [ 'Управление бизнесом', 'business', 'InteractionMenuClient::ShowBusinessManagementUI' ],
    bjoin: [ 'Присоединить к бизнесу', 'add_business', 'InteractionMenuClient::ShowBusinessJoinUI' ],
    dog: [ 'Меню Собаки', 'pets', 'InteractionMenuClient::ShowDogUI' ],
    cat: [ 'Меню Кота', 'pets', 'InteractionMenuClient::ShowCatUI' ],
    weaponattachment: [ 'Модификация оружия', 'extension', 'InteractionMenuClient::ShowWeaponAttachmentUI' ],
    outfit: [ 'Сменить образ', 'accessibility', 'InteractionMenuClient::ShowOutfitUI' ],
    antitheft: [ 'Анти-вор', 'settings_remote', 'InteractionMenuClient::AntiTheft' ],
    attach: ['Присоединить/Отсоединить', 'attach_file', 'InteractionMenuClient::FlatbedAttachment'],
    dispatch: [ 'Диспетчер', 'wysiwyg', 'InteractionMenuClient::Dispatch' ],
    poolpickup: [ 'Pickup pool', 'radio_button_checked', 'InteractionMenuClient::PoolPickup' ],
    // Base items
    phone: [ 'Телефон', 'phone_iphone', 'InteractionMenuClient::TogglePhone' ],
    inventory: [ 'Инвентарь', 'work', 'InteractionMenuClient::ShowInventory' ],
    vget: [ 'Транспорт', 'pedal_bike', 'InteractionMenuClient::ShowPlayerVehicles' ],
    anims: [ 'Анимации', 'accessibility_new', 'InteractionMenuClient::ShowAnimationWheel' ],
    advertisements: [ 'Объявления', 'speaker_notes', 'InteractionMenuClient::Advertisements' ],
    policeutility: ['Скоростной радар', 'settings_remote', 'InteractionMenuClient::SpeedRadar']
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
    closestRecruitingBiz: null,
    antiTheft: false,
    petLevel: 0,

    // Modifiable settings
    playerInteractionDistance: 3.0,
    vehicleInteractionDistance: 4.0,
    propertyInteractionDistance: 2.0,
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

    getClosestPlayer();
    getClosestVehicle();
    let localVehicle = localPlayer.vehicle;

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
        if (localVehicle == null) {
            AddItem('outfit');
        } else {
            RemoveItem('outfit');
        }
    } else {
        RemoveItems(['lock', 'outfit']);
    }

    if (getLocalPlayerWeapons().size > 0) {
        AddItem('weaponattachment')
    } else {
        RemoveItem('weaponattachment')
    }

    if (localVehicle && (localVehicle.getModel() == 1353720154 || localVehicle.getModel() == 2037834373 || localVehicle.getModel() == 4285564673 || localVehicle.getClass() == 15) && (localVehicle.getPedInSeat(-1) == localPlayer.handle)) {
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
        AddItems(['engine', 'vmenu']);
    } else {
        RemoveItems(['engine', 'vmenu']);
    }

    if (menu.closestPlayer.entity && menu.closestPlayer.distance <= params.playerInteractionDistance) {
        AddItem(params.hasBadge ? 'badge' : 'licenses');
        RemoveItem(params.hasBadge ? 'licenses' : 'badge');
    } else {
        RemoveItems(['licenses', 'badge']);
    }

    if (nearLocation(params.closestProperty, params.propertyInteractionDistance) || localPlayer.dimension > 0) {
        AddItem('enterexit');
    } else {
        RemoveItem('enterexit');
    }

    if (params.hasBadge) {
        AddItem('dispatch');
    } else {
        RemoveItem('dispatch');
    }

    if (params.hasPool) {
        AddItem('poolpickup');
    } else {
        RemoveItem('poolpickup');
    }


    if (localPlayer.dimension > 0) {
        AddItems(['pmenu', 'furnishing']);
    } else {
        RemoveItems(['pmenu', 'furnishing']);
    }

    if (nearLocation(params.closestBank, params.bankInteractionDistance)) {
        AddItems(['deposit', 'withdraw']);
    } else {
        RemoveItems(['deposit', 'withdraw']);
    }

    if (nearLocation(params.closestOwnedBiz, params.ownedBizInteractionDistance)) {
        AddItem('bmanager');
    } else {
        RemoveItem('bmanager');
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

mp.events.add('InteractionMenuClient::UseNetTug', () => {
    mp.events.callRemote('InteractionMenuClient::UseNetTug');
});

mp.events.add('InteractionMenuClient::ShowVehicleMenu', () => {
    mp.events.callRemote('InteractionMenuServer::ShowVehicleMenu');
});

mp.events.add('InteractionMenuClient::FreezeHelicopter', () => {
    mp.events.callRemote('InteractionMenuServer::FreezeHelicopter');
});

mp.events.add('InteractionMenuClient::ShowPropertyMenu', () => {
    mp.events.callRemote('InteractionMenuServer::ShowPropertyMenu');
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

mp.events.add('InteractionMenuClient::ShowOutfitUI', () => {
    mp.events.callRemote('InteractionMenuServer::ShowOutfitUI');
});

mp.events.add('InteractionMenuClient::Dispatch', () => {
    mp.events.callRemote('InteractionMenuServer::Dispatch');
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


// From server
mp.events.add('InteractionMenuClient::ToggleBadge', (state) => {
    params.hasBadge = state;
});

mp.events.add('InteractionMenuClient::TogglePool', (state) => {
    params.pool = state;
});

mp.events.add('InteractionMenuClient::OwnedBizReady', () => {
    params.closestOwnedBiz = localPlayer.position;
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

        mp.gui.chat.push("!{DodgerBlue}ИНФОРМАЦИЯ: !{White}Вы только что открыли интерактивное меню, используйте !{LimeGreen}/menu !{White}чтобы настроить его и изменить клавишу, открывающую его..");
    }
}

function hideMenu() {
    if (menu.browser == null || !menu.isVisible) return;
    if (!menu.secondaryCEFOpened) mp.gui.cursor.show(false, false);

    menu.isVisible = false;
    menu.browser.execute(`toggleMenu(${menu.isVisible});`);
}

function startSpeak(){
    if (menu.browser == null || menu.isVisible || menu.chatOpen || menu.cefOpen || mp.gui.cursor.visible)
        return;
    
    mp.events.callRemote("playerSpeaking", true);
    mp.voiceChat.muted = false;
}

function stopSpeak(){
    if (menu.browser == null || menu.isVisible || menu.chatOpen || menu.cefOpen || mp.gui.cursor.visible)
        return;

    mp.events.callRemote("playerSpeaking", false);
    mp.voiceChat.muted = true;
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
    speakCode: defaults.speakCode,

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
    speakCode: 'tac_speak_code',

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

        mp.keys.unbind(playerSettings.speakCode, true, startSpeak);
        mp.keys.unbind(playerSettings.speakCode, false, stopSpeak);

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
                        mp.gui.chat.push("!{Red}Ошибка: !{White}Неверная клавиша.");
                }
            }
        }
    }

    

    // Tac speac btn
    // Bind key last
    let customTacValue = defaults.speakCode;
    let customTacKey = mp.storage.data[storageKeys.speakCode];
    if (customTacKey != undefined && customTacKey != "null" && customTacKey != "default") {
        let num = isValidNumber(customTacKey);
        if (num.valid) {
            customTacValue = num.value;
        } else {
            if (customTacKey.length == 1) {
                customTacValue = customTacKey.toUpperCase().charCodeAt(0);
            } else {
                switch (customTacKey.toLowerCase()) { // Add other custom keys based on demand
                    case 'alt':
                    case 'menu':
                        customTacValue = 0x12;
                        break;
                    case 'ctrl':
                    case 'control':
                        customTacValue = 0x11;
                        break;
                    default:
                        customTacValue = defaults.speakCode;
                        mp.gui.chat.push("!{Red}Ошибка: !{White}Неверная клавиша.");
                }
            }
        }
    }

    playerSettings.keyCode = customKeyValue;
    playerSettings.speakCode = customTacValue;

    mp.keys.bind(playerSettings.keyCode, true, showMenu);
    mp.keys.bind(playerSettings.keyCode, false, hideMenu);

    mp.keys.bind(playerSettings.speakCode, true, startSpeak);
    mp.keys.bind(playerSettings.speakCode, false, stopSpeak);
    menu.keysBound = true;
}

mp.events.add('InteractionMenuClient::Enable', () => {
    if (menu.enabled) return;
    
    menu.enabled = true;

    setStorage(storageKeys.state, !menu.enabled);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы !{LimeGreen}включили !{White}интерактивное меню.`);
});

mp.events.add('InteractionMenuClient::Disable', () => {
    if (!menu.enabled) return;

    menu.enabled = false;

    setStorage(storageKeys.state, !menu.enabled);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы !{Red}отключили !{White}интерактивное меню.`);
});

mp.events.add('InteractionMenuClient::SetKey', (key) => {
    if (!key) {
        mp.gui.chat.push("!{Red}Ошибка: !{White}Неверная клавиша.");
        return;
    }
    key = key.toUpperCase();

    setStorage(storageKeys.keyCode, key)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы изменили кнопку меню на !{LimeGreen}${key}!{White}.`);
});

mp.events.add('PoliceTac::SetKey', (key) => {
    if (!key) {
        mp.gui.chat.push("!{Red}Ошибка: !{White}Неверная клавиша.");
        return;
    }
    key = key.toUpperCase();

    setStorage(storageKeys.speakCode, key)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы изменили клавишу разговора на !{LimeGreen}${key}!{White}.`);
});

mp.events.add('InteractionMenuClient::SetMenuSize', (size) => {
    if (!isValidMenuSize(size)) {
        mp.gui.chat.push(`!{Red}ОШИБКА: !{White}Неверный размер меню. Параметр должен быть между !{LimeGreen}${defaults.minMenuSize} !{White}и !{LimeGreen}${defaults.maxMenuSize}!{White}.`);
        return;
    }

    playerSettings.menuSize = size;

    setStorage(storageKeys.menuSize, size)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы изменили размер меню на !{LimeGreen}${size}!{White}.`);
});

mp.events.add('InteractionMenuClient::SetHoverConfirm', (state) => {
    state = convertState(state);
    playerSettings.confirmOnHoverRelease = state;

    setStorage(storageKeys.hoverConfirm, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы ${state ? '!{LimeGreen}включили' : '!{Red}отключили'} !{White}подтверждение наведения.`);
});

mp.events.add('InteractionMenuClient::SetAnimateOpen', (state) => {
    state = convertState(state);
    playerSettings.animateOpen = state;

    setStorage(storageKeys.animateOpen, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы ${state ? '!{LimeGreen}включили' : '!{Red}отключили'} !{White}анимацию открытия.`);
});

mp.events.add('InteractionMenuClient::SetSortStatus', (state) => {
    state = convertState(state);
    playerSettings.sortItems = state;

    setStorage(storageKeys.sortItems, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы ${state ? '!{LimeGreen}включили' : '!{Red}отключили'} !{White}сортировку предметов.`);
});

mp.events.add('InteractionMenuClient::SetQueueStatus', (state) => {
    state = convertState(state);
    playerSettings.useQueue = state;

    setStorage(storageKeys.useQueue, state);
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы ${state ? '!{LimeGreen}включили' : '!{Red}отключили'} !{White}очередь.`);
});

mp.events.add('InteractionMenuClient::SetThresholdValue', (value) => {
    if (!isValidThresholdValue(value)) {
        mp.gui.chat.push(`!{Red}ОШИБКА: !{White}Недействительное пороговое значение. Параметр должен быть числом от !{LimeGreen}${defaults.baseItemThreshold} !{White}до !{LimeGreen}${defaults.maxMenuPartCount}!{White}.`);
        return;
    }

    playerSettings.baseItemThreshold = value;

    setStorage(storageKeys.threshold, value)
    reloadInteractionMenu();

    mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы изменили пороговое значение на !{LimeGreen}${value}!{White}.`);
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