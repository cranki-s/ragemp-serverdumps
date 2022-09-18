{
let truckermenu = null;

var Orders = [];

mp.events.add('opentruckShop', (component) => {
    if (truckermenu == null) 
    {
        truckermenu = mp.browsers.new('http://package/systems/jobs/trucker/FRONT/trucker.html');
    }
    Orders = component
    truckermenu.execute(`trucker.locale= '${global.Language}'`)
    truckermenu.execute(`trucker.ordersList= ${Orders}`)
    global.menuOpen();

})

mp.events.add("setTruckerOrder", (order) => {
    order = JSON.parse(order);
    Nexus.callRemote("opentruckernew", order.id)
    mp.events.call('closeTruckermenu');
})

mp.events.add("closeTruckermenu", () => {
    if(truckermenu != null){
        truckermenu.destroy();
        truckermenu = null
        global.menuClose();
    }    
})

mp.events.add('replaceOrder', (ordersList) => {
    if (truckermenu != null) {
        Orders = ordersList;
        truckermenu.execute(`trucker.ordersList= ${Orders}`)
    }
})
}