{
﻿var playerDealershipWindow = null;
mp.events.add('PlayerDS::show', () => {
	if (!mp.browsers.exists(playerDealershipWindow))
	{
		playerDealershipWindow = mp.browsers.new("package://gtalife/PlayerDealership/PlayerDealership.html");
		playerDealershipWindow.execute(`$(".dealershipcars" ).empty();`);
		mp.events.callRemote('PlayerDS::LoadDealershipVehicles');
		mp.gui.cursor.show(true, true);
	}
});

mp.events.add('PlayerDS::close', () => {
    mp.events.callRemote('PlayerDS::Close');
});

mp.events.add('PlayerDS::clear', () => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		playerDealershipWindow.execute(`$(".dealershipcars" ).empty();`);
	}
});

mp.events.add('PlayerDS::hide', () => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		playerDealershipWindow.destroy();
		mp.gui.cursor.show(false, false);
	}
});

mp.events.add('PlayerDS::setName', (name) => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		playerDealershipWindow.execute(`$('.dealershipname').text( '${name}');`);
	}
});

mp.events.add('PlayerDS::updatePages', (currentpage, maxpages) => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		playerDealershipWindow.execute(`$('#pageholder').text( '${currentpage}/${maxpages}');`);
		playerDealershipWindow.execute(`$('#pagenumber').text( '${currentpage}');`);
	}
});

mp.events.add('PlayerDS::addVehicle', (id,model, name, price, inv, miles) => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		miles = roundTo(miles, 2);
		playerDealershipWindow.execute(`$(".dealershipcars").append('<div class="dealershipcarbox" id="${id}"><div class="dealershipcarname" id="${model}">${name}</div><img src="https://gta.world/vehicles/${model}.jpg"/><div class="dealershipcarBottom"><div class="dealershipcarprice" id="${price}">$${price}  <br/><span class="dealershipcarmiles">Miles: ${miles}</span></div> <div class="dealershipcarstock">Инв: ${inv} кг</div></div></div>');`);
	}
});

mp.events.add('PlayerDS::returnVehicle', (id, model) => {
    mp.events.callRemote('PlayerDS::ReturnVehicle', id, model);
});

mp.events.add('PlayerDS::nextPage', (currentpage) => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		var currentpage = parseInt(currentpage);
		mp.events.callRemote('PlayerDS::NextPage', currentpage);
	}
});

mp.events.add('PlayerDS::previousPage', (currentpage) => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		var currentpage = parseInt(currentpage);
		mp.events.callRemote('PlayerDS::PreviousPage', currentpage);
	}
});

mp.events.add('PlayerDS::showPurchase', (price) => {
	if (playerDealershipWindow != null && mp.browsers.exists(playerDealershipWindow))
	{
		playerDealershipWindow.execute(`$("#dealership").hide();`);
		playerDealershipWindow.execute(`$( '#price' ).text( '$${price}' );`);
		playerDealershipWindow.execute(`$("#purchase").show();`);

		setTimeout(() => { 
			mp.gui.cursor.show(true, true);
		}, 1000);
	}
});

mp.events.add('PlayerDS::purchase', (type) => {
    mp.events.callRemote('PlayerDS::Purchase', type);
});

mp.events.add('PlayerDS::cancelPurchase', () => {
    mp.events.callRemote('PlayerDS::CancelPurchase');
});

}