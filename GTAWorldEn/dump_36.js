{
var currentOrderManager = null;

mp.events.add('CEF_ShowOrderManager', () => {
    currentOrderManager = mp.browsers.new("package://gtalife/trucking/CEF/RequestOrder.html");
    mp.gui.cursor.show(true, true);
    //mp.gui.chat.push(receipt);
});

mp.events.add('ClientEvent_PushReceiptInfo', (receipt) => {
    currentOrderManager.execute(`pushReceiptInfo('` + receipt + `');`);
    //mp.gui.chat.push(`pushReceiptInfo('` + receipt + `');`);
});

mp.events.add('CEF_CloseOrderManager', () => {
    if(currentOrderManager != null)
    {
        currentOrderManager.destroy();
        mp.gui.cursor.show(false, false);
    }
});

mp.events.add('ClientEvent_PassBusinessData', (businessName, currentComponents, componentCost) => {
    mp.gui.chat.push("here");
    currentOrderManager.execute(`swap();`);

    currentOrderManager.execute(`$("#business-name-header").html('` + businessName + `');`);
    currentOrderManager.execute(`$("#business-name-content").html('` + businessName + `');`);

    currentOrderManager.execute(`$("#component-amt").html('` + currentComponents + `');`);
    currentOrderManager.execute(`setComponentPrice(` + componentCost + `)`);
});


mp.events.add('ServerEvent_CompletedPOISelection', (poiID) => {
    mp.events.callRemote('ServerEvent_CompletedPOISelection', poiID);
});

mp.events.add('ServerEvent_FinalizeOrder', (numCrates) => {
    mp.events.callRemote('ServerEvent_FinalizeOrder', numCrates);
});

mp.events.add('ClientEvent_MakeFuelFriendly', () => {
    currentOrderManager.execute(`$("#change-stock").text('litres of fuel');`);
    currentOrderManager.execute(`$("#change-desc").text('litres of fuel');`);
});
}