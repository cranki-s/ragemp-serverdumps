{
let Taxi = null;
mp.events.add("openTaxiMenu", (start) =>{
    if (Taxi == null) {
        Taxi = mp.browsers.new('package://cef/jobs/Taxi/index.html');   
        Taxi.execute(`Taxi.active=true`);
        Taxi.execute(`Taxi.start=${start}`);
        menuOpen();
    }
    else
        mp.events.call("closeTaxiMenu")
})
mp.events.add("acceptWorkTaxi", (id) => {
    mp.events.call("closeTaxiMenu");
    mp.events.callRemote("acceptWorkTaxi:Server", id);
})
mp.events.add("closeTaxiMenu", () => {
    if (Taxi != null) {
        Taxi.destroy()
        Taxi = null;
        menuClose()
    }
})
}