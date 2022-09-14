{
let mailMenu = null;

mp.events.add("PostOrders::LoadWindow", () => {
    if (mailMenu != null) return;

    mailMenu = mp.browsers.new("package://gtalife/Mailman/index.html");
    mp.events.callRemote("PostOrders::LoadPostOrdersRequest");
    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
});

mp.events.add("PostOrders::CloseCEF", () => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.destroy();
    mailMenu = null;

    mp.gui.cursor.show(false, false);
    mp.events.call('setCefActive', false);
});

mp.events.add("PostOrders::TakeOrder", (id) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mp.events.callRemote("PostOrders::TakePostOrder", id);

    mailMenu.destroy();
    mailMenu = null;
    mp.gui.cursor.show(false, false);
    mp.events.call('setCefActive', false);
});

mp.events.add("PostOrders::NoItemsAdded", () => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.execute(`ShowNoDeliveryOption();`);
});

mp.events.add("PostOrders::DisableOrder", (id) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.execute(`DisableOrder('${id}');`);
});

/*mp.events.add('PostOrders::SendLoadOrdersRequest', () => {
    mp.events.callRemote("PostOrders::LoadPostOrdersRequest");
});*/

mp.events.add('PostOrders::LoadPostOrderCEF', (id, distance, price, address) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.execute(`AddOrder('${id}', '${distance}', '${price}', '${address}');`);
});

mp.events.add('PostOrders::AddItemToOrder', (id, name, count, weight, envelope) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.execute(`AddItem('${id}', '${name}', '${count}', '${weight}', '${envelope}');`);
});

mp.events.add("PostOrders::validateForm", (fName, sName, address, phone, mailText, express, itemsJson) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mp.events.callRemote("PostOrders::PostOrdersValidateForm", fName, sName, address, phone, mailText, express, itemsJson);
});


mp.events.add("PostOrders::startRent", () => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mp.events.callRemote("PostOrders::StartRent");
});

mp.events.add("PostOrders::startRentSpeedo", () => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mp.events.callRemote("PostOrders::StartRentSpeedo");
});

mp.events.add("PostOrders::showNotification", (text) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mp.events.callRemote("PostOrders::ShowNotification", text);
});

mp.events.add("PostOrders::EnableCreateButton", () => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.execute(`EnableOrderCreate();`);
});

mp.events.add("PostOrders::calculatePrice", (address, express, items) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mp.events.callRemote("PostOrders::CalculatePrice", address, express, items);
});

mp.events.add("PostOrders::CalculatePriceResponse", (price) => {
    if (mailMenu == null && !mp.browsers.exists(mailMenu)) return;

    mailMenu.execute(`ShowPrice('${price}');`);
});

mp.events.add('PostOrders::triggerChatBlock', () => {
    mp.gui.chat.activate(false);
    mp.events.call('setCefActive', true);
    mp.gui.cursor.show(true, true);
});

mp.events.add('PostOrders::revokeChatBlock', () => {
    mp.gui.chat.activate(true);
    mp.events.call('setCefActive', false);
});

/*mp.events.add({
    "mailman_create_marker": (name, position) => {
        var l_MarkerName = name;
        var l_MarkerPos = position;
        JobHelper.createMarker(l_MarkerName, l_MarkerPos, 1);
    },

    "mailman_create_blip": (name, position) => {
        var l_BlipName = name;
        var l_BlipPos = position;
        JobHelper.createBlip(l_BlipName, l_BlipPos, 0);
    },

    "mailman_delete_marker": (name) => {
        var l_MarkerName = name;
        JobHelper.removeMarker(l_MarkerName);
    },

    "mailman_delete_blip": (name) => {
        var l_BlipName = name;
        JobHelper.removeBlip(l_BlipName);
    }
});*/
}