{
var pawnshopWindow = null;
mp.events.add('PAWNSHOP_DISPLAY_SHOP_MENU', (items, name) => {
	if (!mp.browsers.exists(pawnshopWindow))
	{
		pawnshopWindow = mp.browsers.new("package://gtalife/PawnShop/pawnshop.html");

		var data = JSON.stringify(items);
		var itemjson = JSON.parse(data);
		pawnshopWindow.execute(`itemData = ${itemjson};`);
		pawnshopWindow.execute(`shopName = '${name}';`);
		pawnshopWindow.execute(`InitializeTable();`);
		mp.gui.cursor.show(true, true);
		mp.gui.chat.show(false);
		mp.events.call('setCefActive', true);
	}
});

mp.events.add('PAWNSHOP_DISPLAY_SHOP_MENU_CLOSE', () => {
	setTimeout(() => { 
		if(pawnshopWindow != null && mp.browsers.exists(pawnshopWindow)) 
		{
			pawnshopWindow.destroy();
			pawnshopWindow = null;
	
			mp.gui.cursor.show(false, false);
			mp.gui.chat.show(true);
			mp.events.call('setCefActive', false);
		}
	}, 1000);
});

mp.events.add('PAWNSHOP::closeButton', () => {
    mp.events.call('PAWNSHOP_DISPLAY_SHOP_MENU_CLOSE');
});

mp.events.add('PAWNSHOP::purchaseItem', (id, amount, price, itemIDs) => {
	mp.events.call('PAWNSHOP_DISPLAY_SHOP_MENU_CLOSE');
    mp.events.callRemote('PAWN_SUBMIT_BUY_REQUEST', id, amount, price, itemIDs);
});

mp.events.add('PAWNSHOP_UPDATE_DISPLAY', (items, name) => {
	if(pawnshopWindow != null && mp.browsers.exists(pawnshopWindow)) 
	{
		var data = JSON.stringify(items);
		var itemjson = JSON.parse(data);
		pawnshopWindow.execute(`itemData = ${itemjson};`);
		pawnshopWindow.execute(`shopName = '${name}';`);
		pawnshopWindow.execute(`InitializeTable();`);
	}
});
}