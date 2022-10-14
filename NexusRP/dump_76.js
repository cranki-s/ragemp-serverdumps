{
let Info = null;
mp.events.add('Vehicle:InfoMenu', (items) => {
    if (Info == null) {
        Info = mp.browsers.new('http://package/systems/vehicle/Info/FRONT/vehicleinfo.html');
        Info.name = 'nexusbrowser';
    }
    Info.execute(`VehicleInfoMenu.locale= '${global.Language}'`);
    Info.execute(`VehicleInfoMenu.Info= ${items}`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;    
});
mp.events.add('Vehicle:CloseInfoMenu', () => {
    if (Info != null) {
        Info.destroy();
        Info = null;
    }
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
});


}