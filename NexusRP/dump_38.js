{
﻿let chipBrowser = global.ConstrolsBrowser;;

mp.events.add('Chips.OpenShop', (chip, money) => {

	chipBrowser.execute(`window.locale ='${global.Language}'`)
	chipBrowser.execute(`openInterface('chips')`); 
	let options = { 
		balance: `${money}`, 
		chips: `${chip}`, 
		buyPrice:100, 
		sellPrice:90 
	} 
	chipBrowser.execute(`controls.openChips(${JSON.stringify(options)})`); 
	global.menuOpen();
});

mp.events.add('Chips:BuyChips',(count)=>{
    NexusEvent.callRemote("Casino.ChangeChips", 1, count);
}); 
mp.events.add('Chips:SellChips',(count)=>{ 
    NexusEvent.callRemote("Casino.ChangeChips", 2, count);
});
mp.events.add('Chips:DestroyBrowser',()=>{ 
	chipBrowser.execute(`closeInterface()`);
    global.menuClose();
});

mp.events.add('Chips.UpdateChipShop',(chip, money)=>{ 
	if(chipBrowser==null) return;
	var options = { 
		balance: `${money}`, 
		chips: `${chip}`, 
		buyPrice:100, 
		sellPrice:90 
	} 
	chipBrowser.execute(`controls.openChips(${JSON.stringify(options)})`); 
});

mp.events.add('Chips:SendNotify', (type, layout,msg,time) => {
    if (chipBrowser != null) {
        chipBrowser.execute(`notify(${type},${layout},"${msg}",${time})`);
    }
});



}