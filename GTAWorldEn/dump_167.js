{
var metaWorldCEF = null;

mp.events.add({
    'MetaWorld::showMeta': (CurrentGames, CurrentWeapons, MaximumPlayers, VehicleList, SelectOption = null, RecommendedOptions = null) => {
        if (metaWorldCEF != null && mp.browsers.exists(metaWorldCEF)) return;

        metaWorldCEF = mp.browsers.new("package://gtalife/MetaWorld/index.html");
        metaWorldCEF.execute(`Initialize(${CurrentGames}, ${CurrentWeapons}, ${MaximumPlayers}, ${VehicleList}, "${SelectOption}", ${RecommendedOptions});`);
        mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the interface.");	
        mp.gui.cursor.show(true, true);
    },
    'MetaWorld::hideMeta': CloseMeta,
    'MetaWorld::createGame': (gameType, spawnedVehicles, teamCount, weaponsList) => {
        if (metaWorldCEF == null && !mp.browsers.exists(metaWorldCEF)) return;
        mp.events.callRemote('MetaWorld::createGame', gameType, spawnedVehicles, teamCount, weaponsList);
    },
    'MetaWorld::deleteGame': (gameID) => {
        if (metaWorldCEF == null && !mp.browsers.exists(metaWorldCEF)) return;
        mp.events.callRemote('MetaWorld::deleteGame', gameID);
    },
    'MetaWorld::startGame': (gameID, vehicleList = null) => {
        if (metaWorldCEF == null && !mp.browsers.exists(metaWorldCEF)) return;
        mp.events.callRemote('MetaWorld::startGame', gameID, vehicleList);
    },
    'MetaWorld::stopGame': (gameID) => {
        if (metaWorldCEF == null && !mp.browsers.exists(metaWorldCEF)) return;
        mp.events.callRemote('MetaWorld::stopGame', gameID);
    },
    'MetaWorld::selectOption': (selectOption, inputValue) => {
        if (metaWorldCEF == null && !mp.browsers.exists(metaWorldCEF)) return;
        mp.events.callRemote('MetaWorld::selectOption', selectOption, inputValue);
    }
});


mp.keys.bind(0x73, false, function () { CloseMeta(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseMeta(); }); // ESC


function CloseMeta() {
    if (metaWorldCEF == null && !mp.browsers.exists(metaWorldCEF)) return;

    metaWorldCEF.destroy();
    mp.gui.cursor.show(false, false);
    metaWorldCEF = null;
}
}