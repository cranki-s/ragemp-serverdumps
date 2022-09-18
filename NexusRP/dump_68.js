{
﻿var TaxiOrders = [];
var EmsOrders = [];
let pad = null
var ActiveOrder = null;
global.OpenPad = false;
let PadType = "";



mp.events.add("Mechanic.OpenTablet.Callback", (dataJSON, activeOrderJSON)=>{
    if (pad == null) pad = mp.browsers.new('http://package/systems/jobs/taxi/FRONT/taxiTablet/taxi.html');
    pad.execute(`tablet.locale = '${global.Language}'`);
    pad.execute(`tablet.type='mechanic'`);
    mp.events.call("Taxi.Tablet.Update", dataJSON, activeOrderJSON);
    global.menuOpen();
    OpenPad = true;   
 
});

mp.events.add("Mechanic:Tablet:CancelOrder", ()=>{
    Nexus.callRemote('Mechanic.Tablet.Cancel');
    mp.events.call('CloseTaxiPad');
})

mp.events.add("Mechanic:Tablet:TakeOrder", (orderJSON)=>{
    orderJSON = JSON.parse(orderJSON)
    Nexus.callRemote('MechanicTablet.TakeOrder', orderJSON.OrderId);
});




mp.events.add("Ambulance.OpenTablet.Callback", (dataJSON, activeOrderJSON)=>{
    if (pad == null) pad = mp.browsers.new('http://package/systems/jobs/taxi/FRONT/taxiTablet/taxi.html');
    pad.execute(`tablet.locale = '${global.Language}'`);
    pad.execute(`tablet.type='ems'`);
    mp.events.call("Taxi.Tablet.Update", dataJSON, activeOrderJSON);
    global.menuOpen();
    OpenPad = true;   
 
});

mp.events.add("Ambulance:Tablet:CancelOrder", ()=>{
    Nexus.callRemote('Ambulance.Tablet.Cancel');
    mp.events.call('CloseTaxiPad');
})

mp.events.add("Ambulance:Tablet:TakeOrder", (orderJSON)=>{
    orderJSON = JSON.parse(orderJSON)
    Nexus.callRemote('AmbulanceTablet.TakeOrder', orderJSON.OrderId);
});


//////////////////////////////////////
mp.events.add("Taxi.OpenTablet.Callback", (dataJSON, activeOrderJSON)=>{
    if (pad == null){ pad = mp.browsers.new('http://package/systems/jobs/taxi/FRONT/taxiTablet/taxi.html');

}
    pad.execute(`tablet.locale = '${global.Language}'`);
    pad.execute(`tablet.type='taxi'`);
    mp.events.call("Taxi.Tablet.Update", dataJSON, activeOrderJSON);
    global.menuOpen();
    OpenPad = true;   
 
});






mp.events.add("Taxi.Tablet.Update", (dataJSON, activeOrderJSON)=>{
    if(pad == null) return;
    let orders = JSON.parse(dataJSON);
    orders.forEach(element => {
        element = parseOrder(element);
    });
    pad.execute(`tablet.orderList=${JSON.stringify(orders)}`);
    
    let element = JSON.parse(activeOrderJSON);
    if(element!=null){
        pad.execute(`tablet.activeOrder=${JSON.stringify(parseOrder(element))}`);
    }
    else{
        pad.execute(`tablet.activeOrder=null`); 
    }
});

function parseOrder(element){
    var street = mp.game.pathfind.getStreetNameAtCoord(element.OrderStreetPosition.x, element.OrderStreetPosition.y, element.OrderStreetPosition.z, 0, 0);
        let area = mp.game.zone.getNameOfZone(element.OrderStreetPosition.x, element.OrderStreetPosition.y, element.OrderStreetPosition.z);
        area = mp.game.ui.getLabelText(area);
        street = mp.game.ui.getStreetNameFromHashKey(street.streetName);
        let adress = `${area} - ${street}`;
        element.streetName = adress;
        let dist = mp.game.system.vdist(element.OrderStreetPosition.x, element.OrderStreetPosition.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
        let i = dist.toFixed(0);
        element.OrderDistance = +i;
        
        return element;
}

mp.events.add("Taxi:Tablet:CancelOrder", ()=>{
    Nexus.callRemote('Taxi.Tablet.Cancel');
    mp.events.call('CloseTaxiPad');
})


mp.events.add('CloseTaxiPad', () => {
    if (pad != null) {
        pad.destroy();
        pad = null;           
    }
    global.menuClose();
    OpenPad = false;
});


mp.events.add("Taxi:Tablet:TakeOrder", (orderJSON)=>{
    orderJSON = JSON.parse(orderJSON)
    Nexus.callRemote('TaxiTablet.TakeOrder', orderJSON.OrderId);
});


mp.keys.bind(Keys.VK_F2, false, function () {    
    if (!loggedin || chatActive || editing || cuffed || global.menuCheck() || mp.players.local.getVariable('InDeath') == true) return;
    if(!mp.players.local.vehicle) return;
    if(mp.players.local.vehicle.model==3338918751){
        Nexus.callRemote("Taxi.OpenTablet");
    }
    if(mp.players.local.vehicle.model==1171614426 || mp.players.local.vehicle.model==3770651682 || mp.players.local.vehicle.model==1500677296 || mp.players.local.vehicle.model==745926877 ){
        Nexus.callRemote("Ambulance.OpenTablet");
    }
    if(mp.players.local.vehicle.model==2072156101){
        Nexus.callRemote("Mechanic.OpenTablet");
    }
});



////////////////////////////////////////////////////



mp.events.add('cancelOrder', () => {
    if (PadType == "taxi") Nexus.callRemote('Taxi::CancelTaxi');
    else Nexus.callRemote('EmsCancelOrder');
    mp.events.call('CloseTaxiPad')
});

mp.events.add('ClearAllOrder', () => {
    if(PadType == "ems") EmsOrders = [];
    else TaxiOrders = [];
})


mp.events.add('setActiveOrder', (order) => {
    order = JSON.parse(order)
    if (PadType == "taxi") Nexus.callRemote('Taxi::TakeOrder', order.OrderId, order.OrderPlayerId);
    else Nexus.callRemote('EmsTakeOrder', order.OrderId, order.OrderPlayerId);
});

mp.events.add('TaxiAddOrder', (order) => {
    order = JSON.parse(order);
    var street = mp.game.pathfind.getStreetNameAtCoord(order.OrderStreetPosition.x, order.OrderStreetPosition.y, order.OrderStreetPosition.z, 0, 0);
    let area = mp.game.zone.getNameOfZone(order.OrderStreetPosition.x, order.OrderStreetPosition.y, order.OrderStreetPosition.z);
    area = mp.game.ui.getLabelText(area)
    street = mp.game.ui.getStreetNameFromHashKey(street.streetName)
    let adress = `${area} - ${street}`;
    order.streetName = adress
    if (PadType == "taxi") {
        TaxiOrders.push(order);
        if (pad != null) {
            TaxiOrders.forEach(element => {
                let dist = mp.game.system.vdist(element.OrderStreetPosition.x, element.OrderStreetPosition.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
                let i = dist.toFixed(0);
                element.OrderDistance = +i
            });
            pad.execute(`tablet.orderList=${JSON.stringify(TaxiOrders)}`)
        }
    } else {
        EmsOrders.push(order);
        if (pad != null) {
            EmsOrders.forEach(element => {
                let dist = mp.game.system.vdist(element.OrderStreetPosition.x, element.OrderStreetPosition.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
                let i = dist.toFixed(0);
                element.OrderDistance = +i
            });
            pad.execute(`tablet.orderList=${JSON.stringify(EmsOrders)}`)
        }
    }  
   // Nexus.callRemote("console", `TaxiOrders ${JSON.stringify(EmsOrders)}`)
});
mp.events.add('RemoveOrder', (index) => {
   // Nexus.callRemote("console", `RemoveOrder ${JSON.stringify(TaxiOrders)}`)
    if (PadType == "taxi") {
        TaxiOrders.splice(index, 1);
    } else {
        EmsOrders.splice(index, 1);
    }
    if (pad != null) {
        if (PadType == "taxi") {
            pad.execute(`tablet.orderList=${JSON.stringify(TaxiOrders)}`)
        } else {
            pad.execute(`tablet.orderList=${JSON.stringify(EmsOrders)}`)
        }
    }
   // Nexus.callRemote("console", `RemoveOrder ${JSON.stringify(TaxiOrders)}`)
});





mp.events.add('OpenTaxiPad', () => {
    if (pad == null){ pad = mp.browsers.new('http://package/systems/jobs/taxi/FRONT/taxiTablet/taxi.html')
    pad.name = 'nexusbrowser';
}
    pad.execute(`tablet.locale = '${global.Language}'`)
    if (PadType == "taxi") {
        TaxiOrders.forEach(element => {
            let dist = mp.game.system.vdist(element.OrderStreetPosition.x, element.OrderStreetPosition.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
            let i = dist.toFixed(0);
            element.OrderDistance = +i
        });
        pad.execute(`tablet.orderList=${JSON.stringify(TaxiOrders)}`)
    } else {
        EmsOrders.forEach(element => {
            let dist = mp.game.system.vdist(element.OrderStreetPosition.x, element.OrderStreetPosition.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
            let i = dist.toFixed(0);
            element.OrderDistance = +i
        });
        pad.execute(`tablet.orderList=${JSON.stringify(EmsOrders)}`)
    }
    pad.execute(`tablet.type='${PadType}'`)
    let ord = getActiveOrder();
    pad.execute(`tablet.activeOrder=${JSON.stringify(ord)}`);
    global.menuOpen();
    OpenPad = true;    
 //   Nexus.callRemote("console", `TaxiOrders ${JSON.stringify(EmsOrders)}`)
})

function getActiveOrder() {
    if (ActiveOrder != null) {
        let dist = mp.game.system.vdist(ActiveOrder.OrderStreetPosition.x, ActiveOrder.OrderStreetPosition.y, 0, mp.players.local.position.x, mp.players.local.position.y, 0);
        let i = dist.toFixed(0);
        ActiveOrder.OrderDistance = +i
        var street = mp.game.pathfind.getStreetNameAtCoord(ActiveOrder.OrderStreetPosition.x, ActiveOrder.OrderStreetPosition.y, ActiveOrder.OrderStreetPosition.z, 0, 0);
        let area = mp.game.zone.getNameOfZone(ActiveOrder.OrderStreetPosition.x, ActiveOrder.OrderStreetPosition.y, ActiveOrder.OrderStreetPosition.z);
        area = mp.game.ui.getLabelText(area)
        street = mp.game.ui.getStreetNameFromHashKey(street.streetName)
        let adress = `${area} - ${street}`;
        ActiveOrder.streetName = adress

    }
    return ActiveOrder
}
///////////////
let confirmmenu = null;
mp.events.add('taxiinfo', (street, distance) => {
    if (confirmmenu == null) confirmmenu = mp.browsers.new('http://package/systems/jobs/taxi/FRONT/confirmOrder/taxi.html')
    confirmmenu.execute(`taxi.locale='${global.Language}'`)
    distance = distance.toFixed(1)
    confirmmenu.execute(`taxi.place='${street}'`);
    confirmmenu.execute(`taxi.distance = ${distance}`);
    confirmmenu.execute(`taxi.active = true`);
    global.menuOpen();
})

mp.events.add('taxiconfirm', (type, value) => {
    global.menuClose();
    confirmmenu.destroy();
    confirmmenu = null
    Nexus.callRemote('Taxi::ConfirmMenu', type, value)
})


}