{
var businessMenuCEF = null;

mp.events.add({
    'BusinessMenu::showBusinessMenu': (OrderList, InventoryList, BusinessType, IconSelected) => {
        if (!mp.browsers.exists(businessMenuCEF)) {
            businessMenuCEF = mp.browsers.new("package://gtalife/BusinessMenu/index.html");
            businessMenuCEF.execute(`Initialize(${OrderList}, ${InventoryList}, ${BusinessType}, "${IconSelected}");`);
            mp.gui.cursor.show(true, true);
            mp.events.call('setCefActive', true);
            mp.game.graphics.notify("Use ~b~F4~w~ or ~b~ESC~w~ to close the business menu.");
        }
    },
    'BusinessMenu::hideBusinessMenu': () => {
        CloseBusinessMenu();
    },
    'BusinessMenu::createItem': (itemName, itemAmount, itemValue, itemType, itemIcon) => {
        if(mp.browsers.exists(businessMenuCEF)) {
            mp.events.callRemote('BusinessMenu::createItem', itemName, itemAmount, itemValue, itemType, itemIcon);
        }
    },
    'BusinessMenu::createDrink': (drinkName, drinkAmount, drinkBaseID, drinkIcon) => {
        if(mp.browsers.exists(businessMenuCEF)) {
            mp.events.callRemote('BusinessMenu::createDrink', drinkName, drinkAmount, drinkBaseID, drinkIcon);
        }
    },
    'BusinessMenu::denyOrder': (orderID) => {
        if(mp.browsers.exists(businessMenuCEF)) {
            mp.events.callRemote('BusinessMenu::denyOrder', orderID);
        }
    },
    'BusinessMenu::acceptOrder': (orderID) => {
        if(mp.browsers.exists(businessMenuCEF)) {
            mp.events.callRemote('BusinessMenu::acceptOrder', orderID);
        }
    },
    'BusinessMenu::chooseIcon': (icon) => {
        if(mp.browsers.exists(businessMenuCEF)) {
            mp.events.callRemote('BusinessMenu::chooseIcon', icon);
        }
    }
});

mp.keys.bind(0x73, false, function () { CloseBusinessMenu(); }); // F4
mp.keys.bind(0x1B, false, function () { CloseBusinessMenu(); }); // ESC

function CloseBusinessMenu()
{
    if(mp.browsers.exists(businessMenuCEF)) {
        businessMenuCEF.destroy();
        mp.gui.cursor.show(false, false);
        mp.events.call('setCefActive', false);
        businessMenuCEF = null;
    }
}
}