{
﻿var supplierBlip = null;
var supplierMarker = null;

var tankerBlip = null;

var orderBlip = null;
var orderMarker = null;

var progressCEF = null;

var returnBlip = null;
var returnMarker = null;

mp.events.add('ClientEvent_ActivateSupplierMapInfo', (location) => {
    supplierBlip = mp.blips.new(318, location,
    {
        name: "TRUCKING | Supplier",
        scale: 1,
        color: 3,
        shortRange: false,
    });

    mp.game.ui.setNewWaypoint(location.x, location.y);

    supplierMarker = mp.markers.new(1, location, 5,
    {
        visible: true,
        color: [255, 0, 0, 255],
    });

});

mp.events.add('ClientEvent_DeleteSupplierMapInfo', () => {
    if(mp.blips.exists(supplierBlip)) supplierBlip.destroy();
    if(mp.markers.exists(supplierMarker)) supplierMarker.destroy();
});

mp.events.add('ClientEvent_DeleteOrderMapInfo', () => {
    if(mp.blips.exists(orderBlip)) orderBlip.destroy();
    if(mp.markers.exists(orderMarker)) orderMarker.destroy();
});

mp.events.add('ClientEvent_CreateSupplierLoadMarker', (location) => {
    supplierMarker = mp.markers.new(0, location, 1,
    {
        visible: true,
        color: [255, 255, 0, 255],
    });
});

mp.events.add('ClientEvent_RemoveSupplierLoadMarker', () => {
    if(mp.markers.exists(supplierMarker)) supplierMarker.destroy();;
});

mp.events.add('ClientEvent_CreateOrderLoadMarker', (location) => {
   if(mp.markers.exists(orderMarker)) orderMarker.destroy();;
    orderMarker = mp.markers.new(0, location, 1, 
    {
        visible: true,
        color: [255, 255, 0, 255],
    });

});

mp.events.add('ClientEvent_CreateTankerBlip', (location) => {
    tankerBlip = mp.blips.new(479, location,
    {
        name: "TRUCKING | Your Tanker",
        scale: 1,
        color: 3,
        shortRange: false,
    });
});

mp.events.add('ClientEvent_CreateReturnMapInfo', (location) => {
    returnMarker = mp.markers.new(0, location, 1,
    {
        visible: true,
        color: [255, 255, 0, 255]
    });

    returnBlip = mp.blips.new(108, location,
    {
       name: "TRUCKING | Finalise Shipment",
       scale: 1,
       color: 3,
       shortRange: false
    });

    mp.game.ui.setNewWaypoint(location.x, location.y);
});

mp.events.add('ClientEvent_DeleteReturnMapInfo', () => {
    if(mp.markers.exists(returnMarker)) returnMarker.destroy();
    if(mp.blips.exists(returnBlip)) returnBlip.destroy();
});

mp.events.add('ClientEvent_DestroyTankerBlip', () => {
    if(mp.blips.exists(tankerBlip)) tankerBlip.destroy();
});

mp.events.add('CEF_ShowShipmentLoadingBar', (type) => {
    progressCEF = mp.browsers.new("package://gtalife/trucking/CEF/LoadingStock.html");
    progressCEF.execute('startLoading(10, 100)');
});

mp.events.add('CEF_HideShipmentLoadingBar', (type) => {
    if(progressCEF != null) progressCEF.destroy();
});

mp.events.add('ClientEvent_FinishedCurrentLoading', () => {
    mp.events.callRemote('Server_FinishedCurrentLoading');
});

mp.events.add('CEF_GetLoadingBarProgress', () => {
    progressCEF.execute(`getLoadingBarProgress();`);
});

mp.events.add('ClientEvent_PassLoadingBarProgress', (val) => {
    mp.events.callRemote('Server_PassLoadingBarProgress', val);
});

mp.events.add('CEF_ResumeShipmentLoadingProgress', (progress) => {
    progressCEF.execute('setLoadingValue(' + progress + ')');
});

mp.events.add('ClientEvent_ActivateOrderMapInfo', (location) => {
    orderBlip = mp.blips.new(318, location,
    {
        name: "TRUCKING | Order",
        scale: 1,
        color: 3,
        shortRange: false,
    });

    mp.game.ui.setNewWaypoint(location.x, location.y);

    orderMarker = mp.markers.new(1, location, 5,
    {
        visible: true,
        color: [255, 0, 0, 255],
    });

});

mp.events.add('ClientEvent_AttachBoxToPlayer', (boxEntity, player, bone, posVector, rotVector) => {
if(mp.objects.exists(boxEntity))        
boxEntity.attachTo(player.handle, bone, posVector.x, posVector.y, posVector.z, rotVector.x, rotVector.y, rotVector.z, true, true, false, true, 0, true);
});

mp.events.add('CEF_ShowOrderLoadingBar', (type) => {
    progressCEF = mp.browsers.new("package://gtalife/trucking/CEF/UnloadingStock.html");
    progressCEF.execute('startUnloading(10)');
});

mp.events.add('CEF_DeleteOrderLoadingBar', () => {
    if(progressCEF != null) progressCEF.destroy();
});

mp.events.add('ClientEvent_FinishedCurrentUnloading', () => {
    mp.events.callRemote('Server_FinishedCurrentUnloading');
});

}满ꐆř