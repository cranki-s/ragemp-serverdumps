{
var currentFlightManager = null;

mp.events.add('CEF_ShowStartPilotManager', () => {
    if(!mp.browsers.exists(currentFlightManager)) {
        currentFlightManager = mp.browsers.new("package://gtalife/PilotJob/CEF/StartPilot.html");
        mp.gui.cursor.show(true, true);
        mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the shipment manager.");
    }
});

mp.keys.bind(0x73, false, function () { closeFlightManager(); }); // F4
mp.keys.bind(0x1B, false, function () { closeFlightManager(); }); // ESC

mp.events.add('ClientEvent_RequestFlightData', (runType) => {
    mp.events.callRemote('Server_RequestFlightDataFromDB', runType);
});

mp.events.add('ClientEvent_PassFlightData', (flightType, data) => {
    if(mp.browsers.exists(currentFlightManager)) {
        if(flightType == 0) currentFlightManager.execute(`$("#cargo-flight-data").html('` + data + `');`);
        else currentFlightManager.execute(`$("#passenger-flight-data").html('` + data + `');`);
    }
});

mp.events.add('ClientEvent_GetDataForFinalScreen', (flightId) => {
    if(mp.browsers.exists(currentFlightManager)) {
        mp.events.callRemote('Server_GetFinalizedFlightData', flightId);
    }
});

mp.events.add('ClientEvent_PassConfirmationData', (flightData, payment) => {
try {
    if(mp.browsers.exists(currentFlightManager)) {
        currentFlightManager.execute(`$("#flight-details").html('` + flightData + `');`);
        currentFlightManager.execute(`$("#payment-amount").html('` + payment + `');`);
    }
}
catch (e) {}
});

mp.events.add('ClientEvent_FinalizeFlight', (flightId) => {
    if(mp.browsers.exists(currentFlightManager)) {
        mp.events.callRemote('Server_FinalizeFlight', flightId);
    }
});

mp.events.add('CEF_HidePilotManager', () => {
	closeFlightManager();
});

function closeFlightManager(){
	if(mp.browsers.exists(currentFlightManager)) {
        currentFlightManager.destroy();
        currentFlightManager = null;
        mp.gui.cursor.show(false, false);
    }
}


}