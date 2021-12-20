{
let window = null;
let isOpen = false;

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

mp.events.add('Client:CreateHud', (money) => {
    try {
        if (window == null) {
            window = mp.browsers.new("package://cef/HUD/index.html");
            isOpen = true;
            window.execute(`addMoney(${money})`)
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

setInterval(() => {
    setTimeout(() => {
        var minimap = getMinimapAnchor();
        if (window != null) {
            setTimeout(() => {
                window.execute(`FixMiniMap(${minimap.rightX * 190}, ${minimap.topY * 100})`);
                window.execute(`FixMessages(${minimap.leftX * 150}, ${minimap.topY * 25})`);
            }, 500);
        }
    }, 500);
}, 1500);

mp.events.add('Client:DestoryHud', () => {
    try {
        if (window != null) {
            window.destroy();
            window = null;
            isOpen = false;
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:AddMoney', (money) => {
    try {
        if (window != null) {
            window.execute(`addMoney(${money})`);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:RemoveMoney', (money) => {
    try {
        if (window != null) {
            window.execute(`removeMoney(${money})`);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:CreateNotification', (title, message, time, type, r, g, b) => {
    try {
        if (window != null) {
            window.execute(`playerNotify('${title}','${message}',${time},'${type}', ${r},${g},${b})`);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:CreateGlobalNotification', (title, message, time, type, r, g, b) => {
    try {
        if (window != null) {
            window.execute(`globalNotify('${title}','${message}',${time},'${type}', ${r},${g},${b})`);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

let kilometers = 0,
    fuel = 0,
    fuelmultiplicator = 0,
    maxfuel = 0,
    fuelempty = false;

mp.events.add("Client:Fuel:SetFuelParams", (newkm, newfuel, newmaxfuel, newfuelmult) => {
    kilometers = newkm;
    fuel = newfuel;
    maxfuel = newmaxfuel;
    fuelmultiplicator = newfuelmult;

    mp.events.callRemote("Server:Debug:SendDebug", newkm)
    mp.events.callRemote("Server:Debug:SendDebug", newfuel)
    mp.events.callRemote("Server:Debug:SendDebug", newmaxfuel)
    mp.events.callRemote("Server:Debug:SendDebug", newfuelmult)
})

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
    if(seat == -1) {
        if(fuel < 0){
            fuel = 0;
        }

        mp.events.callRemote("Server:Vehicle:SaveVehicleStats", kilometers, fuel)

        setTimeout(() => {
            kilometers = 0
            fuel = 0
            fuelmultiplicator = 0
            maxfuel = 0
            fuelempty = false
        }, 50);
    }
})

setTimeout(() => {
    setInterval(() => {
        if (window == null) return;
        if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {

            let currentspeed = mp.players.local.vehicle.getSpeed() * 3.6

            kilometers = kilometers + currentspeed / (3600 * 10)

            if (mp.players.local.vehicle.getClass() !== 13) {

                fuel = fuel - (currentspeed / 1000 / fuelmultiplicator)

                if (fuel < 0) {
                    if(fuelempty == true) return;
                    fuelempty = true;
                    fuel = 0;
                    //ToDo: Set engine state
                }
                else
                {
                    fuelempty = false;
                }
            } else {
                //ToDo: no fuel loss
            }
            window.execute(`showspeedometer('${currentspeed.toFixed(0)}', '${parseFloat(kilometers.toFixed(2))} KM', '${getProzentOfValue(fuel, maxfuel)}')`)
        } else {
            window.execute(`hidespeedometer()`)
        }
    }, 100);
}, 5000);

function getProzentOfValue(minimal, maximal) {
    return ((minimal / maximal) * 100).toFixed(2);
}

mp.events.add('client:sendCommandToServer', (inputval) => {
    mp.events.callRemote('Server:Command:ReceiveCommand', inputval)
});

//INTERACTIONS MENU

var CurrentObject = null;
let Marker = null;

mp.events.add('render', () => {
    let raycast = GetRaycastResult();

    if (Marker != null) {
        Marker.destroy();
        Marker = null;
    }

    if (raycast != null) {

        if (raycast.entity != null) {
            if (raycast.entity.position == undefined) return;
            let distance = mp.game.gameplay.getDistanceBetweenCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, true);
            if (!distance || distance < 0 || distance > 2) return;

            if (Marker != null) {
                Marker.position = raycast.entity.position;
            }

            if (raycast.entity.isAPed()) {
                if (Marker == null) {
                    Marker = mp.markers.new(25, raycast.entity.position, 5, {
                        direction: new mp.Vector3(0, 0, 0),
                        rotation: new mp.Vector3(0, 0, 0),
                        color: [2, 121, 185, 255],
                        visible: true,
                        dimension: 0
                    });
                }
            }
        }
    }
});

mp.keys.bind(0x58, false, function() {
    if (mp.gui.cursor.visible) {
        window.execute(`DestoryXMenu()`);
        mp.gui.cursor.visible = false;
    }
});

function GetRaycastResult() {
    const localcam = mp.cameras.new("gameplay");
    if (localcam != null) {
        let distance = 10;
        let camPos = localcam.getCoord();
        let camDir = localcam.getDirection();
        let pointAt = new mp.Vector3((camDir.x * distance) + (camPos.x), (camDir.y * distance) + (camPos.y), (camDir.z * distance) + (camPos.z));
        return mp.raycasting.testPointToPoint(camPos, pointAt, [1, 16]);
    }
    return null;
}

mp.keys.bind(0x58, true, function() {
    if (!mp.gui.cursor.visible) {

        if (mp.players.local.vehicle) {
            CurrentObject = mp.players.local.vehicle;
            InitMenu('InVehicle');
            return;
        } else if (!mp.players.local.vehicle) {
            let raycast = GetRaycastResult();

            if (raycast != null) {
                let distance = mp.game.gameplay.getDistanceBetweenCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, raycast.entity.position.x, raycast.entity.position.y, raycast.entity.position.z, true);


                if (raycast.entity.getVariable('NO_INTERACTION')) return;

                if (raycast.entity.isAVehicle()) {
                    if (raycast.entity.isDead()) return;
                    if (!distance || distance < 0 || distance > 3) return;
                    CurrentObject = raycast.entity;
                    InitMenu('OutVehicle');
                } else if (raycast.entity.isAPed()) {
                    if (!distance || distance < 0 || distance > 2) return;
                    CurrentObject = raycast.entity;
                    InitMenu('Player');
                }
            }
        }
    }
});

mp.events.add("InteractionMenu:ClientCall", (functionname, type) => {
    if (CurrentObject !== null) {
        if (type == "OutVehicle" || type == "InVehicle") {
            type = "Vehicle";
        }
        mp.events.callRemote(`InteractionMenu:${type}`, functionname, CurrentObject);
        CurrentObject = null;
    }
});

function InitMenu(entity) {
    if (window != null && isOpen) {
        let isDeath = false; /*mp.players.local.getVariable('IS_DEATH');*/
        // let isInDuty = mp.players.local.getVariable('IS_IN_DUTY');
        let isAction = false; /*mp.players.local.getVariable('IS_ACTION');*/
        // let Duty = mp.players.local.getVariable('DUTY_DATA');

        if (!isDeath || !isAction) {

            if (entity === "Player") {
                //CLIENT
                window.execute(`AddModelToXMenu('money','Geld geben','Gebe einer anderen Personen Geld','ClientGiveMoney','givemoney','Player')`)
                window.execute(`AddModelToXMenu('rope','Fesseln','Binde einer anderen Person die Hände','ClientCuffTarget','rope','Player')`)
                window.execute(`AddModelToXMenu('driverlicense','Lizenzkarte','Zeige anderen Personen deine Lizenzen','ClientShowLicences','driverlicense','Player')`)
                window.execute(`AddModelToXMenu('idcard','Ausweis zeigen','Zeige einer anderen Personen deinen Ausweis','ClientShowIdCard','id','Player')`)
                window.execute(`AddModelToXMenu('search','Durchsuchen','Schaue was andere Personen so dabei haben','ClientSearchTarget','search','Player')`)

                // if (isInDuty && Duty == "POLICE") {
                //     window.execute(`AddModelToXMenu('handcuffs','Handschellen','Lege anderen Personen Handschellen an','ClientSetHandCuffs','handcuffs','Player')`)
                // }
                // if (isInDuty && Duty == "MEDIC") {
                //     window.execute(`AddModelToXMenu('syringe','Behandeln','Helfe der Person wieder auf die Beine','ClientMedicRevive','syringe','Player')`)
                //     window.execute(`AddModelToXMenu('inject','Einladen','Lade die Person ein','ClientInjectIntoCar','inject','Player')`)
                // }

                // if (object.getVariable('IS_DEATH')) {
                //     window.execute(`AddModelToXMenu('stabilize','Stabilisieren','Lege die Person in die stabile Seitenlage','ClientStabilize','stabilize','Player')`)
                // }

            } else if (entity === "OutVehicle") {


                // if (isInDuty && Duty == "POLICE") {}
                // if (isInDuty && Duty == "MEDIC") {}

                window.execute(`AddModelToXMenu('lock','Auf/Zu schließen','Schließe das Fahrzeug auf oder zu','ClientToggleVehicleLockState','lock','OutVehicle')`)
                window.execute(`AddModelToXMenu('trunk','Auf/Zu schließen des Kofferraumes','Schließe den Kofferraum auf oder zu','ClientToggleVehicleTrunkState','trunk','OutVehicle')`)

            } else if (entity === "InVehicle") {


                // if (isInDuty && Duty == "POLICE") {}
                // if (isInDuty && Duty == "MEDIC") {}

                window.execute(`AddModelToXMenu('engine','Motor','Schalte den Motor des Fahrzeuges an','ClientToggleVehicleEngine','engine','InVehicle')`)
                window.execute(`AddModelToXMenu('lock','Auf/Zu schließen','Schließe das Fahrzeug auf oder zu','ClientToggleVehicleLockState','lock','InVehicle')`)
                window.execute(`AddModelToXMenu('trunk','Auf/Zu schließen des Kofferraumes','Schließe den Kofferraum auf oder zu','ClientToggleVehicleTrunkState','trunk','InVehicle')`)
            }
            mp.gui.cursor.visible = true;
            window.execute(`CreateXMenu('${entity}')`)
        }
    }
}

mp.events.add("Hud:HideElements", (position, toggle) => {
    window.execute(`ToggleHudElements('${position}', ${toggle})`)
});

mp.events.add('render', () => {
    let player = mp.players.local;
    if (player == null) return;
    let pedWeapon = mp.game.invoke('0x0A6DB4965674D243', player.handle);
    if (pedWeapon == null) return;
    let groupHash = mp.game.weapon.getWeapontypeGroup(pedWeapon);

    if (groupHash != '2685387236') {
        let pedWeaponAmmo = mp.game.invoke('0x015A522136D7F951', player.handle, pedWeapon >> 0)
        let pedWeaponClip = mp.players.local.getAmmoInClip(pedWeapon);
        if (window != null && (pedWeaponAmmo != NaN && pedWeaponAmmo != undefined) && (pedWeaponClip != NaN && pedWeaponClip != undefined)) {
            window.execute(`ToggleWeaponAmmoHud(true)`)
            window.execute(`UpdateWeaponAmmoAtHud('${pedWeaponClip}','${pedWeaponAmmo - pedWeaponClip}')`)
        }
    } else {
        if (window != null) {
            window.execute(`ToggleWeaponAmmoHud(false)`)
        }
    }
    mp.game.ui.hideHudComponentThisFrame(20);
    mp.game.ui.hideHudComponentThisFrame(3);
    mp.game.ui.hideHudComponentThisFrame(22);
    mp.game.ui.hideHudComponentThisFrame(2);

    mp.game.ui.hideHudComponentThisFrame(7);
    mp.game.ui.hideHudComponentThisFrame(6);
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(8);
    mp.game.ui.hideHudComponentThisFrame(10);
});

mp.events.add('Client:Dialog:Call:Event', (eventname, ...args) => {
    if (window != null) {
        mp.events.callRemote(eventname, ...args)
    }
});

mp.events.add('Client:Dialog:Create', (rawData) => {
    if (window != null) {
        window.execute(`CreateDialogField('${rawData}')`)
        mp.gui.cursor.show(true, true);
    }
});

mp.events.add('Client:Dialog:Destory', () => {
    if (window != null) {
        window.execute(`DestoryDialogField()`);
        mp.gui.cursor.show(false, false);
    }
});
}