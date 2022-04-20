{
﻿var dealershipWindow ﻿= null;
mp.events.add('showDealershipMenu', () => {
	if (!mp.browsers.exists(dealershipWindow))
	{
		dealershipWindow ﻿= mp.browsers.new﻿("package://gtalife/Dealership/Dealership.html");
		dealershipWindow.execute(`$(".dealershipcars" ).empty();`);
		mp.events.callRemote('LoadDealershipCars');
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('dealershipClose', () => {
    mp.events.callRemote('DealershipClose');
});

mp.events.add('dealershipClear', () => {
    dealershipWindow.execute(`$(".dealershipcars" ).empty();`);
});

mp.events.add('hideDealershipMenu', () => {
	if (dealershipWindow != null && mp.browsers.exists(dealershipWindow))
	{
		dealershipWindow.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('SetDealershipName', (name) => {
	if (dealershipWindow != null && mp.browsers.exists(dealershipWindow))
	{
		dealershipWindow.execute(`$( '.dealershipname').text( '${name}');`);
	}
});

mp.events.add('UpdateDealershipPages', (currentpage, maxpages) => {
	if (dealershipWindow != null && mp.browsers.exists(dealershipWindow))
	{
		dealershipWindow.execute(`$( '#pageholder').text( '${currentpage}/${maxpages}');`);
		dealershipWindow.execute(`$( '#pagenumber').text( '${currentpage}');`);
	}
});

mp.events.add('AddDealershipVehicle', (id,model, name, price, stock) => {
	if (dealershipWindow != null && mp.browsers.exists(dealershipWindow))
	{
		dealershipWindow.execute(`$(".dealershipcars").append('<div class="dealershipcarbox" id="${id}"><div class="dealershipcarname" id="${model}">${name}</div><img src="https://gta.world/vehicles/${model}.jpg"/><div class="dealershipcarBottom"><div class="dealershipcarprice" id="${price}">$${price}</div> <div class="dealershipcarstock">Inv: ${stock} KG</div></div></div>');`);
	}
});

mp.events.add('returnDSModel', (id, model) => {
    mp.events.callRemote('ReturnDealershipModel', id, model);
});

mp.events.add('dealershipNextPage', (currentpage) => {
	if (dealershipWindow != null && mp.browsers.exists(dealershipWindow))
	{
		var currentpage = parseInt(currentpage);
		mp.events.callRemote('DealershipNextPage', currentpage);
	}
});

mp.events.add('dealershipPrevPage', (currentpage) => {
	if (dealershipWindow != null && mp.browsers.exists(dealershipWindow))
	{
		var currentpage = parseInt(currentpage);
		mp.events.callRemote('DealershipPrevPage', currentpage);
	}
});


//COLOR MENU
var dealershipColorWindow ﻿= null;
mp.events.add('showDealershipColorMenu', (price, priceex) => {
	if (!mp.browsers.exists(dealershipColorWindow))
	{
		dealershipColorWindow ﻿= mp.browsers.new﻿("package://gtalife/Dealership/Swatch.html");
		dealershipColorWindow.execute(`$( '#price' ).text( '$${price}' );`);
		dealershipColorWindow.execute(`$( '#priceEx' ).text( '$${priceex}' );`);
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('dealershipColorClose', () => {
    mp.events.callRemote('DealershipColorClose');
});

mp.events.add('hideDealershipColorMenu', () => {
	if (dealershipColorWindow != null && mp.browsers.exists(dealershipColorWindow))
	{
		dealershipColorWindow.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('returnColorSelected', (color, slot) => {
    mp.events.callRemote('ReturnColorSelected', color, slot);
});

mp.events.add('testDrive', () => {
    mp.events.callRemote('TestDrive');
});

mp.events.add('platePurchase', () => {
    mp.events.callRemote('PlatePurchase');
});

mp.events.add('notPlatePurchase', () => {
    mp.events.callRemote('NotPlatePurchase');
});

mp.events.add('cancelPurchase', () => {
    mp.events.callRemote('CancelPurchase');
});

}唁Ⱦ