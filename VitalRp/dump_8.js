{
﻿let speedoWindow = null;
let player = mp.players.local;
let ui_fuel = 0;
let carkm = -1;
let carkmold = -1;
var blockedModels = [782665360, -1860900134];
var blockedCategories = [14, 15, 16];

let speedBuffer = [];
let velBuffer = [];


function GetFwv(entity) {
    let hr = entity.getHeading() + 90.0;
    if (hr < 0.0) {
        hr = 360.0 + hr
    }
    hr = hr * 0.0174533
    return (x = Math.cos(hr) * 2.0, y = Math.sin(hr) * 2.0)
    };





mp.keys.bind(0x4C, !0, function () {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || phone_menu === !0 || menu_libary === !0 || new Date().getTime() - lastCheck < 100) return;
    if (global.phone === true && mp.gui.cursor.visible === true) return;
    mp.events.callRemote('keypress:L');
    lastCheck = new Date().getTime()
});




oldHealthValue = 1000;



mp.events.add("vehicleFuel", (fuel) => {
    ui_fuel = fuel;
});
mp.events.add("vehicleKM", (km) => {
    if (carkm == -1) {
        carkm = parseInt(km);
        carkmold = parseInt(km);
    }
});
mp.events.add("seatbeltsound", () => {
    if (speedoWindow != null) {

        speedoWindow.execute(`app.playBuckleSound();`);
    }

});

mp.events.add("unseatbeltsound", () => {
    if (speedoWindow != null) {

        speedoWindow.execute(`app.playUnBuckleSound();`);
    }

});


function drawTestText(text) {
    mp.game.graphics.drawText(`${text}`, [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
        font: 4,
        color: [255, 255, 255, 220 - 20],
        scale: [0.40, 0.40],
        outline: true,
        shadow: true,
        centre: false
    });
}

mp.events.add({
    "speed_limiter": () => {
        if (mp.players.local.isInVehicle() && mp.players.local.seat == 0) {
           
            var model = mp.players.local.vehicle.getModel();
            if (mp.players.local.isInVehicle() && mp.players.local.seat == 0) {
                var model = mp.players.local.vehicle.getModel();
                if (IsModelBlocked(model)) {
                    mp.game.graphics.notify("~r~Can't use Speed Limiter on this vehicle!");
                    return
                }
                if (limitMenu == null || limitMenu == null) {
                    limitMenu = new Menu("Speed Limiter", "Model: ~b~" + mp.game.vehicle.getDisplayNameFromVehicleModel(model), 0, 0, 6);
                    var limits = [];
                    limits.push("No Limit");
                    for (var i = limitMultiplier; i <= 120; i += limitMultiplier) limits.push(i.toString());
                    limitSpeedItem = new UIMenuListItem("Limit", "Adjusts the speed limit.", new ItemsCollection(limits), 0);
                    limitMenu.AddItem(limitSpeedItem);
                    limitToggleItem = new UIMenuCheckboxItem("Active", "Toggles the speed limit.", (vehicleMaxSpeedEnabled[model] !== null) ? vehicleMaxSpeedEnabled[model] : !1);
                    limitMenu.AddItem(limitToggleItem);
                    limitSpeedItem.ListChange.on(function (sender, new_index) {
                        var vehicle = mp.players.local.vehicle;
                        SetVehicleMaxSpeed(vehicle, (new_index == 0) ? (mp.game.vehicle.getVehicleModelMaxSpeed(mp.players.local.vehicle.model) * 3.6) : parseInt(limitSpeedItem.IndexToItem(new_index)));
                        SetVehicleLimiterStatus(vehicle, GetVehicleLimiterStatus(vehicle))
                    });
                    limitToggleItem.CheckboxEvent.connect(function (sender, is_checked) {
                        SetVehicleLimiterStatus(mp.players.local.vehicle, is_checked)
                    });
                    limitMenu.RefreshIndex();
                    limitMenu.Visible = !0

                } else {
                    limitMenu.RefreshIndex();
                    limitMenu.Visible = !limitMenu.Visible;
                    if (limitMenu.Visible) {
                        var index = 0;
                        if (vehicleMaxSpeed[model] !== null) {
                            for (var i = limitMultiplier; i <= 120; i += limitMultiplier) {
                                if (i == vehicleMaxSpeed[model]) {
                                    index = (i / limitMultiplier);
                                    return
                                }
                            }
                        }
                        limitSpeedItem.Index = index;
                        limitToggleItem.Checked = GetVehicleLimiterStatus(mp.players.local.vehicle)
                    }
                }
            }
        }
    },
    "speed_limiter_command": (args) => {
        var vehicle = mp.players.local.vehicle;
        var speed = parseInt(args);
        if (isNaN(speed)) {
            if (args == "off") {
                SetVehicleLimiterStatus(vehicle, !1)
            }
        } else {
            if (Math.round(vehicle.getSpeed() * 3.6, 0) > speed) {
                mp.gui.chat.push("Your speed is too high!")
                return;
            }
            SetVehicleMaxSpeed(vehicle, speed);
            SetVehicleLimiterStatus(vehicle, !0)
        }
    },
})

function IsModelBlocked(model) {
    if (blockedModels.indexOf(model) > -1) return !0;
    if (blockedCategories.indexOf(mp.game.vehicle.getVehicleClassFromName(model)) > -1) return !0;
    return !1
}

function SetVehicleMaxSpeed(vehicle, limit) {
    vehicleMaxSpeed[vehicle.getModel()] = limit;
    mp.events.callRemote('SetCruiseValue', limit)
}

function GetVehicleLimiterStatus(vehicle) {
    var model = vehicle.getModel();
    return (vehicleMaxSpeedEnabled[model] === null) ? !1 : vehicleMaxSpeedEnabled[model]
}

function SetVehicleLimiterStatus(vehicle, status) {
    var model = vehicle.getModel();
    if (status) {
        vehicle.setMaxSpeed((vehicleMaxSpeed[model] === null) ? (mp.game.vehicle.getVehicleModelMaxSpeed(model) * 3.6) : (vehicleMaxSpeed[model] / 3.6))
    } else {
        vehicle.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(model) * 3.6)

    }
    vehicleMaxSpeedEnabled[model] = status
}

let timer = 0;

mp.events.add('render', () => {
    mp.players.local.setConfigFlag(33, false);
    if (player.isInAnyVehicle(!1) && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {
        if (speedoWindow === null) {
            speedoWindow = mp.browsers.new("package://files/speedonew/index.html");
        }
   
        let speed = Math.round(player.vehicle.getSpeed() * 3.6, 0);
        let lightState = player.vehicle.getLightsState(1, 1);
        speedoWindow.execute(`app.updateSpeed(${speed});`);
        speedoWindow.execute(`app.updateGas(${ui_fuel});`);
        speedoWindow.execute(`app.setHeadlights(${lightState.lightsOn},${lightState.highbeamsOn});`);
        let carHealth = Math.round(player.vehicle.getEngineHealth());
        enginePercentage = Math.round((carHealth / 1000) * 100, 0);
        speedoWindow.execute(`app.updateHealthEngine(${enginePercentage});`);

        if (vehicleMaxSpeedEnabled[mp.players.local.vehicle.getModel()]) speedoWindow.execute(`app.updateCruise(${vehicleMaxSpeed[mp.players.local.vehicle.getModel()]});`);
        else speedoWindow.execute(`app.updateCruise(0);`)

        let roll = mp.players.local.vehicle.getRoll();
        if ((roll > 75.0 || roll < -75.0) && player.vehicle.getSpeed() < 2) {
            mp.game.controls.disableControlAction(2, 59, true);
            mp.game.controls.disableControlAction(2, 60, true);

        }

        if (carHealth < 900) {
            factor = (carHealth + 200.0) / 1100
            if (carHealth < 100) {
                factor = 0.19;
            }

            mp.game.invoke("0xB59E4BD37AE292DB", player.vehicle.handle, factor)
        }
        //mp.game.invoke("0x4E20D2A627011E8E", player.vehicle.handle, 1.9);





        if (player.vehicle.hasVariable("IndicatorRight")) speedoWindow.execute(`app.updateRightIndicator(${player.vehicle.getVariable("IndicatorRight")});`);
        if (player.vehicle.hasVariable("IndicatorLeft")) speedoWindow.execute(`app.updateLeftIndicator(${player.vehicle.getVariable("IndicatorLeft")});`);
        if (carkm != -1) {
            carkm += speed * 0.00000427;
            var displayKm = String(carkm.toFixed(0));
            speedoWindow.execute(`app.updateKM(${displayKm});`);

            if (carkm - carkmold < 10) {
                if (carkm - carkmold >= 1) {
                    mp.events.callRemote('OnUpdateKm', carkm);
                    carkmold = carkm;
                }
            }
        }


        if (player.hasVariable("seatbelt") && player.getVariable("seatbelt")) {
            mp.players.local.setConfigFlag(32, false);
            speedoWindow.execute(`app.updateSeatbelt(${true});`);
        }
        else {
            let car = mp.players.local.vehicle;
            mp.players.local.setConfigFlag(32, true);
            speedoWindow.execute(`app.updateSeatbelt(${false});`);


        }

    }
    else if (speedoWindow !== null) {
       
        speedoWindow.destroy();
        speedoWindow = null;
    }
});
}