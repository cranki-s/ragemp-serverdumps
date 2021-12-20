{
let window = null;
let isOpen = false;

mp.events.add('Client:CreateItemShop', (rawjson) => {
    try {

        if (window == null) {
            window = mp.browsers.new("package://cef/ItemShop/index.html");
            isOpen = true;
            mp.gui.cursor.show(true, true);
            mp.game.ui.displayRadar(false);
            mp.players.local.freezePosition(true);
            if (window != null) {
                window.execute(`loadItems('${rawjson}')`);
            }
            mp.events.call('Hud:HideElements', 'Left', false)
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:DestroyItemShop', () => {
    try {
        if (window != null) {
            window.destroy();
            window = null;
            isOpen = false;
            mp.game.ui.displayRadar(true);
            mp.players.local.freezePosition(false);
            mp.gui.cursor.show(false, false);
            mp.events.call('Hud:HideElements', 'Left', true)
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:BuyShopItems', (shoppingCardItemArray) => {
    try {
        if (isOpen) {
            mp.events.callRemote('Server:BuyItemShopItems', shoppingCardItemArray);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});
}