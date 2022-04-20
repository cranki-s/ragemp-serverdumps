{
﻿function completedShipmentSelection(type, order)
{
    mp.trigger('CEF_CompledShipmentSelection', type, order);
}

function closeShipmentManager()
{
    mp.trigger('CEF_HideStartShipmentManager');
}

function requestHaulData(runType, shipmentType)
{
    mp.trigger('ClientEvent_RequestHaulData', runType, shipmentType);
}

function closeOrderForm()
{
    mp.trigger('CEF_CloseOrderManager');
}

function selectPOI(poiID)
{
    mp.trigger('ServerEvent_CompletedPOISelection', poiID);
}

function finalizeOrder()
{
    var numCrates = $("#crate-amt").val();
    mp.trigger('ServerEvent_FinalizeOrder', numCrates);
    closeOrderForm();
}

}ꐇř