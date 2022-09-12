{
let taxiWindow = null;



mp.events.add({
    "startTaxi": () => {
        mp.events.callRemote("startTaxiMeter");
    },
    "stopTaxi": () => {
        mp.events.callRemote("stopTaxiMeter");
    },
})




function playerEnterVehicleHandler(vehicle, seat) {
    if (vehicle.hasVariable("TaxiMeter")) {
        const taxiData = vehicle.getVariable('TaxiMeter');
        const taxi = taxiData.split("%");
        if (taxiWindow != null) {
            taxiWindow.destroy();
            taxiWindow = null;
        }
        taxiWindow = mp.browsers.new("package://cef/Interfaces/Factions/TaxiFare/index.html");
        let driver = false;
        if (mp.players.local.getVariable("character_group") === 11 && seat === -1) {
            driver = true;
        }
       
        taxiWindow.execute(`app.setCurrentData(${parseInt(taxi[0])}, ${parseInt(taxi[1])}, ${parseInt(taxi[2])}, ${driver});`);
    }

}


mp.events.add('playerEnterVehicle', playerEnterVehicleHandler);
mp.events.add('render', () => {
    if (!mp.players.local.isInAnyVehicle(!1)) {
        if (taxiWindow !== null) {
            taxiWindow.destroy();
            taxiWindow = null;
        }
    }
});

mp.events.addDataHandler('TaxiMeter', (entity, value, oldValue) => {
    if (entity.type == "vehicle" && entity.handle > 0 && value !== null) {

        if (mp.players.local.vehicle !== null && mp.players.local.vehicle === entity) {

            const taxiData = entity.getVariable('TaxiMeter');

            const taxi = taxiData.split("%");
      
            let driver = false;
   
            if (mp.players.local.getVariable("character_group") === 11 && entity.getPedInSeat(-1) === mp.players.local.handle) {
           
                driver = true;
            }
   
            if (taxiWindow != null)
            taxiWindow.execute(`app.setCurrentData(${parseInt(taxi[0])}, ${parseInt(taxi[1])}, ${parseInt(taxi[2])}, ${driver});`);
        }
        
    }
});




}