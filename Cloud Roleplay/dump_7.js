{
let window = null;
let isOpen = false;

mp.events.add('Client:CreateBank', (bankjson) => {
    try {
        if (window == null) {
            if (bankjson == null) return;
            window = mp.browsers.new("package://cef/Bank/index.html");
            isOpen = true;
            mp.gui.cursor.show(true, true);
            mp.game.ui.displayRadar(false);
            mp.players.local.freezePosition(true);
            mp.events.call('Hud:HideElements', 'Left', false)
            window.execute(`openatm('${bankjson}')`);
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:DestroyBank', () => {
    try {
        if (window != null) {
            window.destroy();
            window = null;
            isOpen = false;
            mp.game.ui.displayRadar(true);
            mp.players.local.freezePosition(false);
            mp.gui.cursor.show(false, false);
            ClothingShopId = null;
            mp.events.call('Hud:HideElements', 'Left', true)
        }
    } catch (error) {
        mp.game.graphics.notify(error);
    }
});

mp.events.add('Client:BankTransfareMoney', (banknumber, amount) => {
    if (isOpen) {
        mp.events.callRemote('Server:BankTransfareMoney', parseInt(banknumber), parseInt(amount))
    }
});

mp.events.add('Client:BankDepositMoney', (amount) => {
    if (isOpen) {
        mp.events.callRemote('Server:BankDepositMoney', parseInt(amount))
    }
});

mp.events.add('Client:BankWithdrawMoney', (amount) => {
    if (isOpen) {
        mp.events.callRemote('Server:BankWithdrawMoney', parseInt(amount))
    }
});
}