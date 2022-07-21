{
var vehiclesGarageCEF = null;

mp.events.add({
    'GarageSpawner::showVehiclesGarage': (VehicleData, GarageName) => {
        if (!mp.browsers.exists(vehiclesGarageCEF))
	    {
            vehiclesGarageCEF = mp.browsers.new("package://gtalife/Garages/index.html");
            vehiclesGarageCEF.execute(`Initialize(${VehicleData}, "${GarageName}");`);
            mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the garage.");
            mp.gui.cursor.show(true, true);
            mp.events.call('setCefActive', true);
        }
    },
    'GarageSpawner::hideVehiclesGarage': () => {
        CloseVehicleGarage();
    },
    'GarageSpawner::spawnGarageVehicle': (vehicleID) => {
        if (mp.browsers.exists(vehiclesGarageCEF))
	    {
            mp.events.callRemote('GarageSpawner::spawnGarageVehicle', vehicleID);
        }
    },
});

mp.keys.bind(0x73, false, function () { CloseVehicleGarage(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseVehicleGarage(); }); // ESC

function CloseVehicleGarage()
{
    if (mp.browsers.exists(vehiclesGarageCEF))
    {
        vehiclesGarageCEF.destroy();
        vehiclesGarageCEF = null;
        mp.gui.cursor.show(false, false);
        mp.events.call('setCefActive', false);
    }
}
}