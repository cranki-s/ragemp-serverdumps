{
/** Contains two-side inventory dialog */

require("ui.js");

let inventoryShown = false;

mp.rpc('inventory:on_click', (inventoryId, itemIndex) => {
    // inventoryId -1 means closed // wtf? rpc?
    mp.events.callRemote("inventory:on_click", inventoryId, itemIndex);
});

mp.rpc("inventory:show_double", (inv1, inv2) => {
    enableUI("inventory", true, true, true);
    inventoryShown = true;
    mp.game.graphics.transitionToBlurred(200);
    browserExecute("inventoryVM.inv1 = " + inv1 + ";");
    browserExecute("inventoryVM.inv2 = " + inv2 + ";");
    browserExecute("inventoryVM.show = true;");
    browserCall("inventoryVM", "setFocus");
});

mp.rpc("inventory:hide", () => {
    disableUI("inventory");
    inventoryShown = false;
    mp.game.graphics.transitionFromBlurred(200);
    browserExecute("inventoryVM.show = false;");
});
}