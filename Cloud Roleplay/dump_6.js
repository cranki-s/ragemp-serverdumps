{
var garage = null;

mp.events.add("Client:CreateGarage", (rawjson, garageId, garagenname) => {
    try {
        if (garage == null) {
            garage = mp.browsers.new("package://cef/Garage/index.html");
            mp.gui.cursor.show(true, true);
            mp.game.ui.displayRadar(false);
            mp.players.local.freezePosition(true);
            garage.active = true;
            setTimeout(() => {
                if (garage != null) {
                    garage.execute(`InitVehicles('${rawjson}', ${garageId}, '${garagenname}')`);
                }
            }, 500);
        }
    } catch (error) {
        mp.game.graphics.notify(`${error}`);
    }
});

mp.events.add('Client:DestroyGarage', () => {
    try {
        if (garage != null) {
            garage.active = false;
            garage.destroy();
            garage = null;
            mp.gui.cursor.show(false, false);
            mp.game.ui.displayRadar(true);
            mp.players.local.freezePosition(false);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:ParkOutVehicle', (garageId, vehicleID) => {
    try {
        if (garage != null) {
            mp.events.callRemote('Server:Garage:ParkOutVehicle', garageId, vehicleID)
            mp.events.call('Client:DestroyGarage');
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:ParkInVehicle', (garageId, vehicleID) => {
    try {
        if (garage != null) {
            mp.events.callRemote('Server:Garage:ParkInVehicle', garageId, vehicleID)
            mp.events.call('Client:DestroyGarage');
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});
}