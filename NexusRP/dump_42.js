{
let shop24;
let type;



mp.keys.bind(Keys.VK_ESCAPE, false, function() {        
	if(shop24 != null){
	mp.game.ui.setPauseMenuActive(false);
	mp.events.call('shop24close')
	}	
});

mp.events.add('shop24', (data, name,typed,moneytype,moneys, bank) => {	
	type = typed;	
    if(shop24 == null){ 
		shop24 = mp.browsers.new('http://package/systems/shops/shop24/FRONT/shop24.html')
		shop24.name = 'nexusbrowser';
		shop24.execute(`shop24.locale='${global.Language}'`);
		shop24.execute(`shop24.setKey(${JSON.stringify(global.cdnKey)})`);
		shop24.execute(`shop24.items=${data}`);
		shop24.execute(`shop24.type=${typed}`);
		 if(moneys)shop24.execute(`shop24.money=${moneys}`);
		 if(bank)shop24.execute(`shop24.moneyBank=${bank}`);	
		if(moneytype) shop24.execute(`shop24.wallet='${moneytype}'`);		
		shop24.execute(`shop24.displayname='${name}'`);
		shop24.execute(`shop24.render(shop24.items)`);
		shop24.execute(`shop24.active=true`);
		global.menuOpen();
	}
});
mp.events.add('shopmoneyupdate', (moneys, bank) =>{
	if(shop24 != null){ 
		shop24.execute(`shop24.money=${moneys}`);
		shop24.execute(`shop24.moneyBank=${bank}`);	
	}
});

mp.events.add('shop24notify', (type, layout, msg, time) => {
	if(shop24 != null){
		shop24.execute(`notify(${type},${layout},"${msg}",${time})`);
	}
});
mp.events.add('shop24close', () => {
	if(shop24 != null){
		shop24.destroy();
		shop24 = null;	
		global.menuClose();
	}
	if(type != 3) mp.events.call("NPC.cameraOff",1500);
});
mp.events.add('buyItem', (type, id, count,types) => {
	if(types == 3){
		NexusEvent.callRemote('CraftMenuTypes',id, count,type);	
	}else if(types == 4){
		NexusEvent.callRemote('BlackShop:Buy',id,count,type);	
	}else if(types == 5){
		NexusEvent.callRemote('Halloween:Buy',id,count);
	}
	else if(types == 6){
		NexusEvent.callRemote('Farm:Buy', type, id, count);
	}
	else if(types == 7){
		NexusEvent.callRemote('AlcoholShop:Buy', type, id, count);
	}
	else NexusEvent.callRemote('shop', type, id, count,types);	
});
}