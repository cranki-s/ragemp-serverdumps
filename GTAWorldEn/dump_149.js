{
var lootboxCEF = null;

mp.events.add('OPEN_CEF_LOOTBOX', () => {
	if (!mp.browsers.exists(lootboxCEF))
	{
		lootboxCEF = mp.browsers.new("package://gtalife/lootbox/index.html");
			
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('CLOSE_CEF_LOOTBOX', () => {
    if (lootboxCEF) {
        mp.gui.cursor.show(false, false);
        lootboxCEF.destroy();
    }
});

mp.events.add('showLootboxItem', (item) => {
    lootboxCEF.execute(`play('${item}')`);
});

mp.keys.bind(0x73, true, function() {
    if (lootboxCEF) {
        mp.gui.cursor.show(false, false);
        lootboxCEF.destroy();
    }
});
}