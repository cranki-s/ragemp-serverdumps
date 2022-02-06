{
﻿const DefaultKey = {
    Stage: 69, // Light stage modifier //69 = E
    Stage_Down: 81, // Light stage modifier //81 = Q
    Horn: 69
}

// Keybinds
const keybindsVK = {
    Stage: 69, // Light stage modifier //69 = E
    Stage_Down: 81, // Light stage modifier //81 = Q
    Tone1: 49, // Siren tone 1
    Tone1_Numpad: 97, // Siren tone 1
    Tone2: 50, // Siren tone 2
    Tone2_Numpad: 98, // Siren tone 2
    Tone3: 51, // Siren tone 3
    Tone3_Numpad: 99, // Siren tone 3
    Tone4: 52, // Siren tone 4
    Tone4_Numpad: 100, // Siren tone 4
    Tone5: 53, // Siren tone 5
    Tone5_Numpad: 101, // Siren tone 5
    Tone6: 54, // Siren tone 6
    Tone6_Numpad: 106, // Siren tone 6
    Horn: 69,
}

let sirenKeys = {
    keyStage: 'sirenkeystage',
    keyStageDown: 'sirenkeystage_down',
    keyHorn: 'sirenkeyhorn',
};

var CustomHorn = false;
var HornPressed = false;
var RenderTimeRadioNow = null;

// Siren tones
const sirenTones = [
    { // 0 = POLICE
        tone1: 'VEHICLES_HORNS_SIREN_1', // Siren tone 1
        tone2: 'VEHICLES_HORNS_SIREN_2', // Siren tone 2
        tone3: 'VEHICLES_HORNS_POLICE_WARNING', // Siren tone 3
        tone4: 'VEHICLES_HORNS_AMBULANCE_WARNING', // Siren tone 4
        horn: 'SIRENS_AIRHORN' // Horn
    },
    { // 1 = POLICE 2
        tone1: 'RESIDENT_VEHICLES_SIREN_WAIL_03', // Siren tone 1
        tone2: 'RESIDENT_VEHICLES_SIREN_QUICK_03', // Siren tone 2
        tone3: 'VEHICLES_HORNS_POLICE_WARNING', // Siren tone 3
        tone4: 'RESIDENT_VEHICLES_SIREN_WAIL_02', // Siren tone 4
        tone5: 'RESIDENT_VEHICLES_SIREN_QUICK_02', // Siren tone 5
        horn: 'SIRENS_AIRHORN' // Horn
    },
    { // 2 = FIRE
        tone1: 'RESIDENT_VEHICLES_SIREN_WAIL_01', // Siren tone 1
        tone2: 'RESIDENT_VEHICLES_SIREN_QUICK_01', // Siren tone 2
        tone3: 'VEHICLES_HORNS_AMBULANCE_WARNING', // Siren tone 3
        tone4: 'RESIDENT_VEHICLES_SIREN_FIRETRUCK_WAIL_01', // Siren tone 4
        tone5: 'RESIDENT_VEHICLES_SIREN_FIRETRUCK_QUICK_01', // Siren tone 5
        tone6: 'VEHICLES_HORNS_FIRETRUCK_WARNING', // Siren tone 6
        horn: 'SIRENS_AIRHORN' // Horn
    },
    { // 3 = horns
        horn: 'VEHICLES_HORNS_CAR_HORN_MED_1', // Horn Normal
        hornTruck: 'VEHICLES_HORNS_CAR_HORN_MED_4' // Truck Horn
    }
]

var FDVehicles = [];
FDVehicles.push(3523245962); // LSFDAmbulance
FDVehicles.push(674561429); // LSFDBrush
FDVehicles.push(289351444); // LSFDWater
FDVehicles.push(608134768); // LSFDCaracara
FDVehicles.push(3414953959); // LSFDQuint
FDVehicles.push(3615375545); // Lsfdengine
FDVehicles.push(2490698595); // LSFDUtility
FDVehicles.push(2292039297); // Firehazmat

var PDVehicles = [];
PDVehicles.push(1947925897); // Bcat
PDVehicles.push(1811562607); // Umkcara

var PDVehiclesRare = [];
//PDVehicles.push(1915122717); // Lssdcara
//PDVehicles.push(1811562607); // Umkcara
PDVehiclesRare.push(3149195696); // Policeb1
PDVehiclesRare.push(4260343491); // Policeb

var DisabledSirenVehicles = [];
var DisabledSirenVehicles_Trucks = [];
DisabledSirenVehicles.push(264241789); // Coroner
DisabledSirenVehicles_Trucks.push(2971866336); // TowTruck
DisabledSirenVehicles_Trucks.push(3852654278); // TowTruck2
DisabledSirenVehicles_Trucks.push(2037834373); // Flatbed3
//DisabledSirenVehicles.push(1353720154); // Flatbed
DisabledSirenVehicles.push(1691386928); // Bsfug
DisabledSirenVehicles.push(724851846); // secbufsx 

// Default timeout to prevent key spamming
const keyTimeout = 500 // Milliseconds
var wasSent = false;
let minimapELS = null;
var SoundID = 0;
var VehicleELS = [];
var VehicleELSHorn = [];
var print_hud = true;
var hudShown = false;
var HUDTimeNow = null;

function CanOperateEMS(){
    let entity = mp.players.local.vehicle;
    if(!entity) return false;
    if(entity.getPedInSeat(-1) === mp.players.local.handle) return true;
    if(entity.getPedInSeat(0) === mp.players.local.handle) return true;
    return false;
}

function CanVehicleUseEMS(entity){
    if(!entity) return false;
    if(DisabledSirenVehicles.includes(entity.getModel())) return true;
    if(DisabledSirenVehicles_Trucks.includes(entity.getModel())) return true;
    if(entity.getClass() == 18) return true;
    if(FDVehicles.includes(entity.getModel())) return true;
    if(PDVehicles.includes(entity.getModel())) return true;
    if(PDVehiclesRare.includes(entity.getModel())) return true;
    return false;
}

function CanVehicleUseEmergencySiren(entity){
    if(!entity) return false;
    if(DisabledSirenVehicles.includes(entity.getModel())) return false;
    if(DisabledSirenVehicles_Trucks.includes(entity.getModel())) return false;
    if(CanVehicleUseEMS(entity)) return true;
    return false;
}

mp.events.add('render', _ => {
    var pressedShiftE = false;

    if (mp.players.local.vehicle && CanVehicleUseEMS(mp.players.local.vehicle)) {
        mp.game.controls.disableControlAction(27, 86, true);
        mp.game.controls.disableControlAction(27, 85, true); // Disable Q
        mp.game.audio.setUserRadioControlEnabled(false);

        if(Date.now() >= RenderTimeRadioNow+5000){
            mp.game.audio.setRadioToStationName("OFF");
            RenderTimeRadioNow = Date.now();
        }
    }

    for (const key in keybindsVK) {
        if ((keybindsVK[key] !== keybindsVK.Stage && keybindsVK[key] !== keybindsVK.Stage_Down && keybindsVK[key] !== keybindsVK.Horn) && mp.keys.isDown(keybindsVK[key]) === true && CanOperateEMS() && !mp.gui.cursor.visible) {
            if (wasSent == false) {
                var name = key.replace('_Numpad', '');
                mp.events.call('inputEMS', name)
                wasSent = true
                setTimeout(() => {
                    wasSent = false
                }, keyTimeout)
            }
        }else if ((keybindsVK[key] === keybindsVK.Stage || keybindsVK[key] === keybindsVK.Stage_Down) && mp.keys.isDown(keybindsVK[key]) === true && mp.keys.isDown(16) === true && CanOperateEMS() && !mp.gui.cursor.visible) {
            pressedShiftE = true;
            if (wasSent == false) {
                mp.events.call('inputEMS', key)
                wasSent = true
                setTimeout(() => {
                    wasSent = false
                }, keyTimeout)
            }
        }
    }
    if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle){
        if (mp.keys.isDown(keybindsVK.Horn) === true && CanOperateEMS() && !mp.gui.cursor.visible && !HornPressed && !pressedShiftE)
            mp.events.call('inputHorn');

        if (mp.players.local.vehicle && CanVehicleUseEMS(mp.players.local.vehicle) && mp.keys.isUp(keybindsVK.Horn) === true && CanOperateEMS() && !mp.gui.cursor.visible && !pressedShiftE && HornPressed) {
            let entity = mp.players.local.vehicle
            mp.events.callRemote('syncHorn', entity, false, "");
            HornPressed = false;
        }
    }
    /*if(CustomHorn){
        if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle){
            if (mp.keys.isDown(keybindsVK.Horn) === true && CanOperateEMS() && !mp.gui.cursor.visible && !HornPressed && !pressedShiftE)
                mp.events.call('inputHorn');

            if (mp.players.local.vehicle && CanVehicleUseEMS(mp.players.local.vehicle) && mp.keys.isUp(keybindsVK.Horn) === true && CanOperateEMS() && !mp.gui.cursor.visible && !pressedShiftE) {
                let entity = mp.players.local.vehicle
                mp.events.callRemote('syncHorn', entity, false, "");
                HornPressed = false;
            }
        }
    }else{
        if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle){
            if (mp.game.controls.isControlJustPressed(13, 51) && CanOperateEMS() && !mp.gui.cursor.visible && !pressedShiftE)
            mp.events.call('inputHorn');

            if (mp.players.local.vehicle && CanVehicleUseEMS(mp.players.local.vehicle) && mp.game.controls.isControlJustReleased(13, 51) && CanOperateEMS() && !mp.gui.cursor.visible && !pressedShiftE) {
                let entity = mp.players.local.vehicle
                mp.events.callRemote('syncHorn', entity, false, "");
                HornPressed = false;
            }
        }
    }*/
    if (mp.players.local.vehicle && CanVehicleUseEMS(mp.players.local.vehicle) && CanOperateEMS() && print_hud && !hudShown) {
        if(Date.now() <= HUDTimeNow+5000){
            var EMSStatus = "~s~ELS~n~~r~ВЫКЛ";
            var EMSSound = "";
            if(mp.players.local.vehicle.currentCode == 2) EMSStatus = "~s~ELS~n~~y~МАЯЧКИ";
            if(mp.players.local.vehicle.currentCode == 3){
                EMSStatus = "~s~ELS~n~~g~СИРЕНА";
                //EMSSound = "~n~~s~SOUND~n~~r~OFF";
                //if(mp.players.local.vehicle.currentSiren > 0) EMSSound = "~n~~s~SOUND~n~~g~ON";
            }
            
            
            EMSStatus += EMSSound;
            if(minimapELS !== null){
                mp.game.graphics.drawText(EMSStatus, [(res_X - 70) / res_X, minimapELS.bottomY + WidescreenOffset_Y - 0.18], {
                    font:4, 
                    color:[255, 255, 255, 200],
                    scale: [0.6, 0.6],
                    outline: true,
                    centre: true
                });
            }else{
                minimapELS = getMinimapAnchor();
            }
        }else hudShown = true;
    }
})

// Sync lights to other players
mp.events.add('Client::syncLight', (vehicle, siren, sound, code, sirenCode) => {
    vehicle.setSirenSound(sound);
    vehicle.setSiren(siren);
    vehicle.currentCode = code;
    vehicle.currentSiren = sirenCode;
    if(vehicle === mp.players.local.vehicle){
        hudShown = false;
        HUDTimeNow = Date.now();   
    }
})

/*mp.keys.bind( 0x73, true, (player) => { // F4
	mp.gui.chat.push(`[DEBUG] VehicleELS: ${JSON.stringify(VehicleELS)}`);
	mp.gui.chat.push(`[DEBUG] VehicleELSHorn: ${JSON.stringify(VehicleELSHorn)}`);
	mp.gui.chat.push(`[DEBUG] SoundID: ${SoundID}`);
    let RageID = mp.game.invoke('0x430386FE9BF80B45');
    mp.gui.chat.push(`[DEBUG] RageSoundID: ${RageID}`);
	mp.gui.chat.push(`[DEBUG] Using RageIDs?: ${RageID!=-1? 'yes':'no'}`);
    mp.game.audio.releaseSoundId(RageID);
});*/

function CreateSoundID(){
    let RageID = mp.game.invoke('0x430386FE9BF80B45');
    if(RageID != -1) return RageID;
    return SoundID++;
}

// Sync sirens to other players
mp.events.add('Client::syncSiren', (vehicle, playing, sound, id) => {
    var ELSData = VehicleELS.find(obj => { return obj.vehicle === id });
    if (!playing) {
        if(ELSData !== undefined){
            var index = VehicleELS.findIndex(x => x.vehicle === id);
            VehicleELS.splice(index,1);
            mp.game.audio.stopSound(ELSData.id);
            mp.game.audio.releaseSoundId(ELSData.id);
        }
    } else {
        let ID = CreateSoundID();
        if(ELSData !== undefined){
            mp.game.audio.stopSound(ELSData.id);
            mp.game.audio.releaseSoundId(ELSData.id);
            ELSData.id = ID;
            
        }else{
            VehicleELS.push({"vehicle": id, "id": ID});
        }
        mp.game.audio.playSoundFromEntity(ID, sound, vehicle.handle, '', true, 0);
    }
})

// Sync horn to other players
mp.events.add('Client::syncHorn', (vehicle, playing, sound, id) => {
    var ELSData = VehicleELSHorn.find(obj => { return obj.vehicle === id });
    if (!playing) {
        if(ELSData !== undefined){
            var index = VehicleELSHorn.findIndex(x => x.vehicle === id);
            VehicleELSHorn.splice(index,1);
            mp.game.audio.stopSound(ELSData.id);
            mp.game.audio.releaseSoundId(ELSData.id);
        }
    } else {
        let ID = CreateSoundID();
        if(ELSData !== undefined){
            mp.game.audio.stopSound(ELSData.id);
            mp.game.audio.releaseSoundId(ELSData.id);
            ELSData.id = ID;
        }else{
            VehicleELSHorn.push({"vehicle": id, "id": ID});
        }
        mp.game.audio.playSoundFromEntity(ID, sound, vehicle.handle, '', true, 0);
    }
})


mp.events.add('inputEMS', (key, modifier = false) => {
    let entity = mp.players.local.vehicle
    if (entity && entity.type === 'vehicle' && CanVehicleUseEMS(entity)) {
        /* LIGHTING STAGE */
        if(key.includes("Stage")){
            if(key.includes("Down")){
                entity.currentCode -= 1;
                if (!entity.currentCode) {
                    entity.currentCode = 1;
                }
                if (entity.currentCode <= 1) {
                    entity.currentCode = 1;
                }                
            }else{
                if (!entity.currentCode) {
                    entity.currentCode = 1;
                }
                if(entity.currentCode < 3){
                    entity.currentCode += 1;
                    if (entity.currentCode >= 2) {
                        entity.currentCode = 2;
                    }
                }
            }
            switch (entity.currentCode) {
                case 1: {
                    mp.events.callRemote('syncSiren', entity, false, '');
                    mp.events.callRemote('syncLight', entity, false, false, entity.currentCode, 0);
                    break
                }
                case 2: {
                    mp.events.callRemote('syncSiren', entity, false, '');
                    mp.events.callRemote('syncLight', entity, true, true, entity.currentCode, 0);
                    break
                }
                case 3: {
                    mp.events.callRemote('syncLight', entity, true, true, entity.currentCode, 0);
                    break
                }
            }
            hudShown = false;
            HUDTimeNow = Date.now();
        }
        /* Tone Options */
        else if(key.includes("Tone")){
            if(CanVehicleUseEmergencySiren(entity)){
                if (entity.currentCode >= 2) {
                    if(entity.currentCode != 3) entity.currentCode = 3;
                    if (!entity.currentSiren) {
                        entity.currentSiren = 0;
                    }
                    var id = parseInt(key.replace("Tone", ""));
                    if (id === entity.currentSiren) {
                        entity.currentSiren = 0;
                        entity.currentCode = 2;
                        mp.events.callRemote('syncSiren', entity, false, '');
                    } else {
                        var type = key.toLowerCase();
                        var sirenGroup = 0;
                        if(FDVehicles.includes(entity.getModel())) sirenGroup = 2;
                        if(PDVehiclesRare.includes(entity.getModel())) sirenGroup = 1;
    
                        if(sirenTones[sirenGroup][type] !== undefined){
                            entity.currentSiren = id;
                            //mp.events.callRemote('syncSiren', entity, false, '');
                            mp.events.callRemote('syncSiren', entity, true, sirenTones[sirenGroup][type]);
                        }else{
                            entity.currentSiren = 0;
                            entity.currentCode = 2;
                            mp.events.callRemote('syncSiren', entity, false, '');
                        }
                    }
                    mp.events.callRemote('syncLight', entity, true, true, entity.currentCode, entity.currentSiren);
                    hudShown = false;
                    HUDTimeNow = Date.now();
                }
            }
        }
    }
    
})

mp.events.add('inputHorn', _ => {
    if (mp.players.local.vehicle && CanVehicleUseEMS(mp.players.local.vehicle)) {
        let entity = mp.players.local.vehicle
        if (!HornPressed) {
            mp.events.callRemote('syncHorn', entity, true, GetHorn(entity));
            HornPressed = true;
        }
    }
})

function GetHorn(entity){
    if(!entity) return sirenTones[0].horn;
    if(DisabledSirenVehicles.includes(entity.getModel())) return sirenTones[3].horn;
    if(DisabledSirenVehicles_Trucks.includes(entity.getModel())) return sirenTones[3].hornTruck;
    return sirenTones[0].horn;
}

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
    if (vehicle && vehicle.type === 'vehicle' && CanVehicleUseEMS(vehicle)) {
        if(seat === -1){
            if(vehicle.currentSiren > 0){
                mp.events.callRemote('syncSiren', vehicle, false, '');
                mp.events.callRemote('syncLight', vehicle, true, true, vehicle.currentCode, 0);
            }
            if(HornPressed){
                mp.events.callRemote('syncHorn', vehicle, false, "");
            }
        }
        if(CanVehicleUseEmergencySiren(vehicle))
            mp.events.call("WeaponSelection::EmergencyVehicle", false);
    }
})

var Showninfo = false;
mp.events.add("playerEnterVehicle", (vehicle, seat) => {
    if (vehicle && vehicle.type === 'vehicle' && CanVehicleUseEMS(vehicle) && (seat === -1 || seat === 0)) {
        if(CanVehicleUseEmergencySiren(vehicle))
            mp.events.call("WeaponSelection::EmergencyVehicle", true);

        if(!Showninfo){
            let customKeyUp = mp.storage.data[sirenKeys.keyStage];
            let customKeyDown = mp.storage.data[sirenKeys.keyStageDown];
            var UpKey = String.fromCharCode(DefaultKey.Stage);
            var DownKey = String.fromCharCode(DefaultKey.Stage_Down);
            if (customKeyUp != undefined){ UpKey = customKeyUp; }
            if (customKeyDown != undefined){ DownKey = customKeyDown; }
            mp.gui.chat.push(`!{DodgerBlue}[ИНФО] !{White}Используйте  !{DodgerBlue}SHIFT+${UpKey}!{White} чтобы включить проблесковые маячки, используйте  !{DodgerBlue}SHIFT+${DownKey}!{White} чтобы выключить их.`);
            Showninfo = true;
        }
        hudShown = false;
        HUDTimeNow = Date.now();
        mp.game.audio.setRadioToStationName("OFF");
    }
})

mp.events.add('Client::SirenSetKey', (stage, key) => {
    if (!key) {
        mp.gui.chat.push("!{Red}ОШИБКА: !{White}Недопустимая клавиша клавиатуры, вы можете использовать только клавиши a-z.");
        return;
    }
    key = key.toUpperCase();
    if (key.length != 1 && key !== "DEFAULT") {
        mp.gui.chat.push("!{Red}ОШИБКА: !{White}Недопустимая клавиша клавиатуры, вы можете использовать только клавиши a-z.");
        return;
    }
    if (!isNaN(key)) {
        mp.gui.chat.push("!{Red}ОШИБКА: !{White}Недопустимая клавиша клавиатуры, вы можете использовать только клавиши a-z.");
        return;
    }

    if(stage === "up"){
        if(key === "DEFAULT") key = String.fromCharCode(DefaultKey.Stage);
        setStorage(sirenKeys.keyStage, key)
        mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы сменили клавишу маячков !{DodgerBlue}STAGE UP!{White} на !{LimeGreen}SHIFT+${key}!{White}.`);
    }else if(stage === "down"){
        if(key === "DEFAULT") key = String.fromCharCode(DefaultKey.Stage_Down);
        setStorage(sirenKeys.keyStageDown, key)
        mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы сменили клавишу маячков !{DodgerBlue}STAGE DOWN!{White} на !{LimeGreen}SHIFT+${key}!{White}.`);
    }else if(stage === "horn"){
        if(key === "DEFAULT") key = String.fromCharCode(DefaultKey.Horn);
        setStorage(sirenKeys.keyHorn, key)
        mp.gui.chat.push(`!{DodgerBlue}ИНФО: !{White}Вы сменили клавишу сирены !{DodgerBlue}HORN!{White} на !{LimeGreen}${key}!{White}.`);
    }else{
        mp.gui.chat.push("!{Red}ОШИБКА: !{White}Недопустимое значение stage.");
    }
    BindSirenKeys();
});

function setSirenStorage(variable, value) {
    mp.storage.data[variable] = value;
    mp.storage.flush();
}
BindSirenKeys(); // init on load
function BindSirenKeys(){
    CustomHorn=false;
    let customKeyValueUp = DefaultKey.Stage;
    let customKeyValueDown = DefaultKey.Stage_Down;
    let customKeyValueHorn = DefaultKey.Horn;

    let customKeyUp = mp.storage.data[sirenKeys.keyStage];
    let customKeyDown = mp.storage.data[sirenKeys.keyStageDown];
    let customKeyHorn = mp.storage.data[sirenKeys.keyHorn];
    if (customKeyUp != undefined && customKeyUp != "null") {
        let num = isValidNumber(customKeyUp);
        if (num.valid) {
            customKeyValueUp = num.value;
        } else {
            if (customKeyUp.length == 1) {
                customKeyValueUp = customKeyUp.toUpperCase().charCodeAt(0);
            } else {
                mp.gui.chat.push(`!{Red}ОШИБКА: !{White}Недействительная клавиша для сирены !{Red}STAGE UP!{White} по умолчанию !{LimeGreen}${String.fromCharCode(customKeyValueUp)}!{White}.`);
            }
        }
    }
    if (customKeyDown != undefined && customKeyDown != "null") {
        let num = isValidNumber(customKeyDown);
        if (num.valid) {
            customKeyValueDown = num.value;
        } else {
            if (customKeyDown.length == 1) {
                customKeyValueDown = customKeyDown.toUpperCase().charCodeAt(0);
            } else {
                mp.gui.chat.push(`!{Red}ОШИБКА: !{White}Недействительная клавиша для сирены !{Red}STAGE DOWN!{White} по умолчанию !{LimeGreen}${String.fromCharCode(customKeyValueDown)}!{White}.`);
            }
        }
    }
    if (customKeyHorn != undefined && customKeyHorn != "null") {
        let num = isValidNumber(customKeyHorn);
        if (num.valid) {
            customKeyValueHorn = num.value;
            CustomHorn = true;
        } else {
            if (customKeyHorn.length == 1) {
                customKeyValueHorn = customKeyHorn.toUpperCase().charCodeAt(0);
                CustomHorn = true;
            } else {
                mp.gui.chat.push(`!{Red}ОШИБКА: !{White}Недействительная клавиша для сирены !{Red}HORN!{White} по умолчанию !{LimeGreen}${String.fromCharCode(customKeyValueHorn)}!{White}.`);
            }
        }
    }
    keybindsVK.Stage = customKeyValueUp;
    keybindsVK.Stage_Down = customKeyValueDown;
    keybindsVK.Horn = customKeyValueHorn;
}

/*function isValidNumber(number) {
    let converted = parseInt(number, 10);

    return {
        valid: !isNaN(converted),
        value: isNaN(converted) ? 0 : converted
    };
}*/

}