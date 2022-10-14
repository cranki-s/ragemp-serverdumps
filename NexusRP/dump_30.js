{
let GasMenu = global.ConstrolsBrowser;
mp.events.add('Gas:OpenMenu', (options) => {
    GasMenu.execute(`window.locale ='${global.Language}'`)
    GasMenu.execute(`openInterface('gas')`);
    GasMenu.execute(`controls.openGas(${options})`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
})

mp.events.add('Gas:BuyBank', newGas => {
    NewEvent.callRemote('Gas:BuyPetrol',newGas,1);    
});
mp.events.add('Gas:BuyCash', newGas => {
    NewEvent.callRemote('Gas:BuyPetrol',newGas,0);    
});
mp.events.add('Gas:UseTicket', () => {
    console.log('Gas:UseTicket');
});
mp.events.add('Gas:DestroyBrowser', () => {
    if (GasMenu != null) 
    {
        GasMenu.execute(`closeInterface()`);
        mp.gui.cursor.visible = false;
        global.menuOpened = false;
    }
});

mp.events.add('Clabback',(currentLicense)=>{
    if(TransportLicenseMenu != null){
       NewEvent.callRemote(`${currentLicense}`,)
    }    
})
}