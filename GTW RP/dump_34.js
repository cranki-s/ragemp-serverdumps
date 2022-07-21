{
var currentShipmentManager = null;

mp.events.add('CEF_ShowStartShipmentManager', (Level) => {
    if(!mp.browsers.exists(currentShipmentManager)) {
        currentShipmentManager = mp.browsers.new("package://gtalife/trucking/CEF/StartShipment.html");
        currentShipmentManager.execute(`hideIrrelevantData(` + Level + `)`); 
        mp.gui.cursor.show(true, true);
        mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the shipment manager.");
    }
});

mp.events.add('CEF_ShowStartShipmentManagerPersonal', (Level) => {
    if(!mp.browsers.exists(currentShipmentManager)) {
        currentShipmentManager = mp.browsers.new("package://gtalife/trucking/CEF/StartShipmentPersonal.html");
        currentShipmentManager.execute(`hideIrrelevantData(` + Level + `)`); 
        mp.gui.cursor.show(true, true);
        mp.events.callRemote('Server_RequestHaulDataFromDB', 1, 0);
        mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the shipment manager.");
    }
});

mp.events.add('CEF_HideStartShipmentManager', () => {
	CloseShipmentManager();
});

mp.keys.bind(0x73, false, function () { CloseShipmentManager(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseShipmentManager(); }); // ESC

mp.events.add('ClientEvent_RequestHaulData', (runType, shipmentType) => {
    mp.events.callRemote('Server_RequestHaulDataFromDB', runType, shipmentType);
});

mp.events.add('ClientEvent_PassHaulData', (runType, data) => {
    if(mp.browsers.exists(currentShipmentManager)) {
        if(runType == 1) currentShipmentManager.execute(`$("#shorthaul-data").html('` + data + `');`);
        else currentShipmentManager.execute(`$("#longhaul-data").html('` + data + `');`);
    }
});

mp.events.add('ClientEvent_CheckForValidSuppliers', (orderID) => {
    mp.events.callRemote('Server_CheckForValidSuppliers', orderID);
});

mp.events.add('ClientEvent_PassSupplierData', (data, requestedStock) => {
    if(mp.browsers.exists(currentShipmentManager)) {
        currentShipmentManager.execute(`$("#supplier-data").html('` + data + `');`);
        currentShipmentManager.execute(`$("#finalize-stock-list").text('` + requestedStock + `');`);
    }
});

mp.events.add('ClientEvent_GetDataForFinalScreen', (supplierID) => {
    if(mp.browsers.exists(currentShipmentManager)) {
        mp.events.callRemote('Server_GetFinalizedShipmentData', supplierID);
    }
});

mp.events.add('ClientEvent_PassConfirmationData', (orderData, supplierData, payment) => {
try {
    if(mp.browsers.exists(currentShipmentManager)) {
        currentShipmentManager.execute(`$("#order-details").html('` + orderData + `');`);
        currentShipmentManager.execute(`$("#supplier-details").html('` + supplierData + `');`);
        currentShipmentManager.execute(`$("#payment-amount").html('` + payment + `');`);
    }
}
catch (e) {}
});

mp.events.add('ClientEvent_FinalizeShipment', () => {
    if(mp.browsers.exists(currentShipmentManager)) {
        mp.events.callRemote('Server_FinalizeShipment');
    }
});

function CloseShipmentManager(){
	if(mp.browsers.exists(currentShipmentManager)) {
        currentShipmentManager.destroy();
        currentShipmentManager = null;
        mp.gui.cursor.show(false, false);
    }
}
}