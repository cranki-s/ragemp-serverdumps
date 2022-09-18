{
let TransportLicenseMenu;
let MenuType;
mp.events.add('BuyTransportLicense:OpenMenu',(type,availableLicense,currentLicense,title,subtitle)=>{
    if(TransportLicenseMenu == null){
        TransportLicenseMenu = mp.browsers.new('http://package/systems/player/buyTransportLicense/FRONT/index.html');
        TransportLicenseMenu.name = 'nexusbrowser';
        TransportLicenseMenu.execute(`buyTransportLicense.locale='${global.Language}'`);
        TransportLicenseMenu.execute(`buyTransportLicense.availableLicense=${availableLicense}`);
        TransportLicenseMenu.execute(`buyTransportLicense.currentLicense=${currentLicense}`);
        TransportLicenseMenu.execute(`buyTransportLicense.x='${title}'`);
        TransportLicenseMenu.execute(`buyTransportLicense.namespace='${subtitle}'`);
    }
    global.menuOpened = true;
    mp.gui.cursor.visible = true;
    MenuType = type;

})
mp.events.add('BuyTransportLicense:UpdateCurrentLicense',(currentLicense)=>{
    if(TransportLicenseMenu != null){
        TransportLicenseMenu.execute(`buyTransportLicense.currentLicense=${currentLicense}`);
    }    
})
mp.events.add('BuyTransportLicense:BuyLicense', (licensetype) => {
    switch (MenuType) {
        case 0:
            Nexus.callRemote('BuyTransportLicense:BuyLicense', licensetype)
            break;
        case 1:
            Nexus.callRemote('Mission', licensetype)
            break;
    }
});

mp.events.add('BuyTransportLicense:Close', () => {
    if(TransportLicenseMenu !=null){
        TransportLicenseMenu.destroy();
        TransportLicenseMenu = null;
    }
    if(MenuType == 0){
        mp.events.call('NPC.cameraOff',1500);   
    }   
    global.menuOpened = false;
    mp.gui.cursor.visible = false;
});
}