{
﻿var currentShipmentManager = null;

mp.events.add('CEF_ShowStartShipmentManager', () => {
    currentShipmentManager = mp.browsers.new("package://gtalife/trucking/CEF/StartShipment.html");
    mp.gui.cursor.show(true, true);
});

mp.events.add('CEF_ShowStartShipmentManagerPersonal', () => {
    currentShipmentManager = mp.browsers.new("package://gtalife/trucking/CEF/StartShipmentPersonal.html");
    mp.gui.cursor.show(true, true);
    mp.events.callRemote('Server_RequestHaulDataFromDB', 1, 0);
});

mp.events.add('CEF_CompledShipmentSelection', (type, cargo) => {
    mp.events.callRemote('Server_CompletedShipmentSelection', type, cargo);
});

mp.events.add('CEF_HideStartShipmentManager', () => {
    currentShipmentManager.destroy();
    mp.gui.cursor.show(false, false);
});

mp.events.add('ClientEvent_SetTruckerAuthLevel', (lvl) => {
    currentShipmentManager.execute(`hideIrrelevantData(` + lvl + `)`); 
});

mp.events.add('ClientEvent_RequestHaulData', (runType, shipmentType) => {
    mp.events.callRemote('Server_RequestHaulDataFromDB', runType, shipmentType);
});

mp.events.add('ClientEvent_PassHaulData', (runType, data) => {
    if(runType == 1) {
        currentShipmentManager.execute(`$("#shorthaul-data").html('` + data + `');`);
    }
    else {
        currentShipmentManager.execute(`$("#longhaul-data").html('` + data + `');`);
    }
});

mp.events.add('ClientEvent_CheckForValidSuppliers', (orderID) => {
    mp.events.callRemote('Server_CheckForValidSuppliers', orderID);
});

mp.events.add('ClientEvent_PassSupplierData', (data, requestedStock) => {
    currentShipmentManager.execute(`$("#supplier-data").html('` + data + `');`);
    currentShipmentManager.execute(`$("#finalize-stock-list").text('` + requestedStock + `');`);
});

mp.events.add('ClientEvent_GetDataForFinalScreen', (supplierID) => {
    mp.gui.chat.push(supplierID);
    mp.events.callRemote('Server_GetFinalizedShipmentData', supplierID);
});

mp.events.add('ClientEvent_PassConfirmationData', (orderData, supplierData, payment) => {
try {
    currentShipmentManager.execute(`$("#order-details").html('` + orderData + `');`);
    currentShipmentManager.execute(`$("#supplier-details").html('` + supplierData + `');`);
    currentShipmentManager.execute(`$("#payment-amount").html('` + payment + `');`);
}
catch (e) {}
});

mp.events.add('ClientEvent_FinalizeShipment', () => {
    mp.events.callRemote('Server_FinalizeShipment');
});

mp.events.add('TRUCKING_FindDelivery', (supplierID) => {
    currentShipmentManager = mp.browsers.new("package://gtalife/trucking/CEF/FindDelivery.html");
    mp.gui.cursor.show(true, true);
    currentShipmentManager.execute(`showFindDelivery(supplierID);`);
});

mp.events.add('TRUCKING_FindSupplier', () => {
    currentShipmentManager = mp.browsers.new("package://gtalife/trucking/CEF/StartShipmentPersonal.html");
    mp.gui.cursor.show(true, true);
    currentShipmentManager.execute(`showFindDelivery(supplierID);`);
});

}셖ï