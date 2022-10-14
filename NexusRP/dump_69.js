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
    NewEvent.callRemote('Mechanic.Tablet.Cancel');
    mp.events.call('CloseTaxiPad');
})

mp.events.add("Mechanic:Tablet:TakeOrder", (orderJSON)=>{
    orderJSON = JSON.parse(orderJSON)
    NewEvent.callRemote('MechanicTablet.TakeOrder', orderJSON.OrderId);
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
    NewEvent.callRemote('Ambulance.Tablet.Cancel');
    mp.events.call('CloseTaxiPad');
})

mp.events.add("Ambulance:Tablet:TakeOrder", (orderJSON)=>{
    orderJSON = JSON.parse(orderJSON)
    NewEvent.callRemote('AmbulanceTablet.TakeOrder', orderJSON.OrderId);
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
    NewEvent.callRemote('Taxi.Tablet.Cancel');
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
    NewEvent.callRemote('TaxiTablet.TakeOrder', orderJSON.OrderId);
});


mp.keys.bind(Keys.VK_F2, false, function () {    
    if (!loggedin || chatActive || editing || cuffed || global.menuCheck() || mp.players.local.getVariable('InDeath') == true) return;
    if(!mp.players.local.vehicle) return;
    if(mp.players.local.vehicle.model==3338918751){
        NewEvent.callRemote("Taxi.OpenTablet");
    }
    if(mp.players.local.vehicle.model==1171614426 || mp.players.local.vehicle.model==3770651682 || mp.players.local.vehicle.model==1500677296 || mp.players.local.vehicle.model==745926877 ){
        NewEvent.callRemote("Ambulance.OpenTablet");
    }
    if(mp.players.local.vehicle.model==2072156101){
        NewEvent.callRemote("Mechanic.OpenTablet");
    }
});



////////////////////////////////////////////////////



mp.events.add('cancelOrder', () => {
    if (PadType == "taxi") NewEvent.callRemote('Taxi::CancelTaxi');
    else NewEvent.callRemote('EmsCancelOrder');
    mp.events.call('CloseTaxiPad')
});

mp.events.add('ClearAllOrder', () => {
    if(PadType == "ems") EmsOrders = [];
    else TaxiOrders = [];
})


mp.events.add('setActiveOrder', (order) => {
    order = JSON.parse(order)
    if (PadType == "taxi") NewEvent.callRemote('Taxi::TakeOrder', order.OrderId, order.OrderPlayerId);
    else NewEvent.callRemote('EmsTakeOrder', order.OrderId, order.OrderPlayerId);
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
   // NewEvent.callRemote("console", `TaxiOrders ${JSON.stringify(EmsOrders)}`)
});
mp.events.add('RemoveOrder', (index) => {
   // NewEvent.callRemote("console", `RemoveOrder ${JSON.stringify(TaxiOrders)}`)
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
   // NewEvent.callRemote("console", `RemoveOrder ${JSON.stringify(TaxiOrders)}`)
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
 //   NewEvent.callRemote("console", `TaxiOrders ${JSON.stringify(EmsOrders)}`)
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
    NewEvent.callRemote('Taxi::ConfirmMenu', type, value)
})


}t_dance",
              "af": 1
            },
            {
              "id": 29,
              "name": "Танец Диджея",
              "ad": "mini@strip_club@idles@dj@idle_04",
              "an": "idle_04",
              "af": 1
            },
            {
              "id": 30,
              "name": "Танец Диджея №2",
              "ad": "anim@mp_player_intcelebrationmale@dj",
              "an": "dj",
              "af": 1
            },
            {
              "id": 31,
              "name": "Танцевать как курочка",
              "ad": "anim@mp_player_intupperchicken_taunt",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 32,
              "name": "Флексить как репер",
              "ad": "missfbi3_sniping",
              "an": "dance_m_default",
              "af": 1
            },
            {
              "id": 33,
              "name": "Аккуратный танец",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "low_center_up",
              "af": 1
            },
            {
              "id": 34,
              "name": "Современный танец",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
              "an": "high_center",
              "af": 1
            },
            {
              "id": 35,
              "name": "Танец забвения",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
              "an": "med_center_down",
              "af": 1
            },
            {
              "id": 36,
              "name": "Танец на месте",
              "ad": "anim@amb@nightclub@dancers@black_madonna_entourage@",
              "an": "hi_dance_facedj_09_v2_male^5",
              "af": 1
            },
            {
              "id": 37,
              "name": "Танец на месте №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_09_v1_female^6",
              "af": 1
            },
            {
              "id": 38,
              "name": "Танец на месте №3",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_09_v1_male^2",
              "af": 1
            },
            {
              "id": 39,
              "name": "Танец зумбы",
              "ad": "timetable@tracy@ig_5@idle_a",
              "an": "idle_a",
              "af": 1
            },
            {
              "id": 40,
              "name": "Танец зумбы №2",
              "ad": "timetable@tracy@ig_5@idle_a",
              "an": "idle_b",
              "af": 1
            },
            {
              "id": 41,
              "name": "Танец зумбы №3",
              "ad": "timetable@tracy@ig_5@idle_a",
              "an": "idle_c",
              "af": 1
            },
            {
              "id": 42,
              "name": "Клубный танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_15_v2_male^6",
              "af": 1
            },
            {
              "id": 43,
              "name": "Клубный танец №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_17_v2_male^6",
              "af": 1
            },
            {
              "id": 44,
              "name": "Клубный танец №3",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "mi_dance_facedj_15_v2_female^6",
              "af": 1
            },
            {
              "id": 45,
              "name": "Клубный танец №4",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
              "an": "hi_dance_facedj_09_v1_male^1",
              "af": 1
            },
            {
              "id": 46,
              "name": "Клубный танец №5",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
              "an": "hi_dance_facedj_15_v1_female^6",
              "af": 1
            },
            {
              "id": 47,
              "name": "Клубный танец №6",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@",
              "an": "high_center_down",
              "af": 1
            },
            {
              "id": 48,
              "name": "Клубный танец №7",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_mi_to_hi_08_v1_male^1",
              "af": 1
            },
            {
              "id": 49,
              "name": "Клубный танец №8",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v1_female^6",
              "af": 1
            },
            {
              "id": 50,
              "name": "Танец лепестка",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "med_center_up",
              "af": 1
            },
            {
              "id": 51,
              "name": "Танец пожилого человека",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
              "an": "high_right_down",
              "af": 1
            },
            {
              "id": 52,
              "name": "Танец заводной",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_13_flyingv_laz",
              "af": 1
            },
            {
              "id": 53,
              "name": "Танец диско",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_11_pointthrust_laz",
              "af": 1
            },
            {
              "id": 54,
              "name": "Танец бедрами",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_15_shimmy_laz",
              "af": 1
            },
            {
              "id": 55,
              "name": "Танец индийский",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_17_teapotthrust_laz",
              "af": 1
            },
            {
              "id": 56,
              "name": "Танец счастливый",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@",
              "an": "med_center_up",
              "af": 1
            },
            {
              "id": 57,
              "name": "Танец шафл руками",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@male@var_b@",
              "an": "high_center_down",
              "af": 1
            },
            {
              "id": 58,
              "name": "Танец Skibidi",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@male@var_b@",
              "an": "high_center",
              "af": 49
            },
            {
              "id": 59,
              "name": "Танец c хлопаками",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_li_to_mi_11_v1_male^4",
              "af": 1
            },
            {
              "id": 60,
              "name": "Танец улётный",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_15_v2_male^2",
              "af": 1
            },
            {
              "id": 61,
              "name": "Танец чилловый",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_17_v1_male^3",
              "af": 1
            },
            {
              "id": 62,
              "name": "Танец лейла",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_17_v2_female^3",
              "af": 1
            },
            {
              "id": 63,
              "name": "Танец Dj",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
              "an": "hi_dance_facedj_17_v2_male^2",
              "af": 1
            },
            {
              "id": 64,
              "name": "Танец Электро",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_hi_to_mi_09_v1_male^4",
              "af": 1
            },
            {
              "id": 65,
              "name": "Танец Загадочный",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_li_to_mi_11_v1_female^3",
              "af": 1
            },
            {
              "id": 66,
              "name": "Танец Игривый",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_mi_to_hi_09_v1_female^3",
              "af": 1
            },
            {
              "id": 67,
              "name": "Танец Игривый №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_hi_intensity",
              "an": "trans_dance_facedj_hi_to_li_09_v1_female^3",
              "af": 1
            },
            {
              "id": 68,
              "name": "Танец Руки Вверх",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_low_intensity",
              "an": "trans_dance_facedj_li_to_hi_09_v1_female^2",
              "af": 1
            },
            {
              "id": 69,
              "name": "Танец Руки Вверх №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_med_intensity",
              "an": "trans_dance_facedj_mi_to_hi_08_v1_female^3",
              "af": 1
            },
            {
              "id": 70,
              "name": "Танец Лапули",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_mi_to_li_09_v1_female^3",
              "af": 1
            },
            {
              "id": 71,
              "name": "Танец Зазывающий",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v1_female^3",
              "af": 1
            },
            {
              "id": 72,
              "name": "Танец Манящий",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v2_female^1",
              "af": 1
            },
            {
              "id": 73,
              "name": "Танец Раскрепощенный",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v2_female^3",
              "af": 1
            },
            {
              "id": 74,
              "name": "Танец Зайки",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v2_female^5",
              "af": 1
            },
            {
              "id": 75,
              "name": "Танец Вальяжный ",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_11_v1_female^3",
              "af": 1
            },
            {
              "id": 76,
              "name": "Танец Игривый",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_11_v1_female^1",
              "af": 1
            },
            {
              "id": 77,
              "name": "Танец с наклоном",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_11_v1_male^4",
              "af": 1
            },
            {
              "id": 78,
              "name": "Танец Кокетки",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_13_v2_female^1",
              "af": 1
            },
            {
              "id": 79,
              "name": "Танец Динамичный",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_15_v2_female^1",
              "af": 1
            },
            {
              "id": 80,
              "name": "Танец Лапули №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_15_v2_female^3",
              "af": 1
            },
            {
              "id": 81,
              "name": "Танец Цыганочка",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v1_female^2",
              "af": 1
            },
            {
              "id": 82,
              "name": "Танец Шейк",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v2_female^2",
              "af": 1
            },
            {
              "id": 83,
              "name": "Танец Мачо №3",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v2_male^4",
              "af": 1
            },
            {
              "id": 84,
              "name": "Развязный танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "li_dance_crowd_09_v2_female^3",
              "af": 1
            },
            {
              "id": 85,
              "name": "Танец Извивающийся",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_13_v2_female^1",
              "af": 1
            },
            {
              "id": 86,
              "name": "Милый танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_13_v2_female^5",
              "af": 1
            },
            {
              "id": 87,
              "name": "Уличный танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_10_v2_female^5",
              "af": 1
            },
            {
              "id": 88,
              "name": "Танец Кокетки №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_17_v2_female^1",
              "af": 1
            },
            {
              "id": 89,
              "name": "Танец Заигрывающий",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_17_v2_female^6",
              "af": 1
            },
            {
              "id": 90,
              "name": "Танец с оборотами №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
              "an": "hi_dance_crowd_09_v2_female^3",
              "af": 1
            },
            {
              "id": 91,
              "name": "Танец Удачи",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
              "an": "hi_dance_crowd_11_v1_female^1",
              "af": 1
            },
            {
              "id": 92,
              "name": "Бодрый танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
              "an": "hi_dance_crowd_17_v2_female^2",
              "af": 1
            },
            {
              "id": 93,
              "name": "Танец с вилянием бедрами",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_hi_to_mi_09_v1_female^1",
              "af": 1
            },
            {
              "id": 94,
              "name": "Танец кулачками легкий",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "low_center",
              "af": 1
            },
            {
              "id": 95,
              "name": "Танцевать локтями",
              "ad": "anim@mp_player_intupperuncle_disco",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 96,
              "name": "Расслабленный танец",
              "ad": "anim@mp_player_intuppersalsa_roll",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 97,
              "name": "Танец качающий",
              "ad": "anim@mp_player_intupperraise_the_roof",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 98,
              "name": "Стучать пальцами о пальцы",
              "ad": "anim@mp_player_intupperoh_snap",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 99,
              "name": "Танец сумасшедшего",
              "ad": "anim@mp_player_intuppercats_cradle",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 100,
              "name": "Танец жизнерадостный",
              "ad": "anim@mp_player_intupperbanging_tunes",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 101,
              "name": "Танец активный",
              "ad": "anim@mp_player_intcelebrationmale@heart_pumping",
              "an": "heart_pumping",
              "af": 1
            },
            {
              "id": 102,
              "name": "Победный танец",
              "ad": "anim@mp_player_intcelebrationmale@the_woogie",
              "an": "the_woogie",
              "af": 1
            },
            {
              "id": 103,
              "name": "Танец волна",
              "ad": "anim@mp_player_intupperfind_the_fish",
              "an": "idle_a",
              "af": 49
            }
          ]
    },
    {
        id:5,
        name:'Физ.упражнения',
        img:'physical_exercise',
        special:false,
        animations:
        [{"id":0,"name":"Качать пресс","ad":"amb@world_human_sit_ups@male@base","an":"base","af":1},{"id":1,"name":"Отжиматься","ad":"amb@world_human_push_ups@male@base","an":"base","af":1},{"id":2,"name":"Глубокие отжимания","ad":"switch@franklin@press_ups","an":"pressups_loop","af":1},{"id":3,"name":"Сальто назад","ad":"anim@arena@celeb@flat@solo@no_props@","an":"flip_a_player_a","af":1},{"id":4,"name":"Разминать кулаки","ad":"anim@mp_player_intupperknuckle_crunch","an":"idle_a","af":1},{"id":5,"name":"Занимается йогой","ad":"amb@world_human_yoga@female@base","an":"base_b","af":1},{"id":6,"name":"Занимается йогой №2","ad":"amb@world_human_yoga@female@base","an":"base_c","af":1},{"id":7,"name":"Занимается йогой №3","ad":"missfam5_yoga","an":"f_yogapose_b","af":1},{"id":8,"name":"Элемент йоги №1","ad":"missfam5_yoga","an":"f_yogapose_b","af":1},{"id":9,"name":"Элемент йоги №2","ad":"missfam5_yoga","an":"a3_pose","af":1},{"id":10,"name":"Элемент йоги №3","ad":"missfam5_yoga","an":"a2_pose","af":1},{"id":11,"name":"Бег на месте","ad":"rcmfanatic1","an":"jogging_on_spot","af":1},{"id":12,"name":"Позировать","ad":"amb@world_human_muscle_flex@arms_in_front@base","an":"base","af":1},{"id":13,"name":"Сделать ласточку","ad":"rcmfanatic1maryann_stretchidle_b","an":"idle_e","af":1},{"id":14,"name":"Медитация","ad":"rcmcollect_paperleadinout@","an":"meditiate_idle","af":1},{"id":15,"name":"Пробежка на месте (Ж)","ad":"amb@world_human_jog_standing@female@idle_a","an":"idle_a","af":1},{"id":16,"name":"Пробежка на месте (М)","ad":"amb@world_human_jog_standing@male@fitidle_a","an":"idle_a","af":1},{"id":17,"name":"Карате","ad":"anim@mp_player_intcelebrationmale@karate_chops","an":"karate_chops","af":1},{"id":18,"name":"Бокс с тенью","ad":"anim@mp_player_intcelebrationmale@shadow_boxing","an":"shadow_boxing","af":1}]
    },
    {
        id:6,
        name:'Эмоции',
        img:'emotion',
        special:false,
        animations:
        [{"id":0,"name":"Соглашаться","ad":"gestures@m@sitting@generic@casual","an":"gesture_pleased","af":1},{"id":1,"name":"Отказываться","ad":"gestures@m@sitting@generic@casual","an":"gesture_head_no","af":1},{"id":2,"name":"Отказываться с жестами","ad":"gestures@m@sitting@generic@casual","an":"gesture_no_way","af":1},{"id":3,"name":"Отрицательно махать головой","ad":"mp_player_int_upper_nod","an":"mp_player_int_nod_no","af":49},{"id":4,"name":"Пожимать плечами","ad":"gestures@m@sitting@generic@casual","an":"gesture_shrug_hard","af":1},{"id":5,"name":"Схватиться за сердце","ad":"rcmfanatic1out_of_breath","an":"p_zero_tired_01","af":49},{"id":6,"name":"Итальянское одобрение","ad":"anim@mp_player_intcelebrationmale@finger_kiss","an":"finger_kiss","af":1},{"id":7,"name":"Плохо пахнет","ad":"anim@mp_player_intcelebrationmale@stinker","an":"stinker","af":1},{"id":8,"name":"Я слежу за вами","ad":"anim@mp_player_intupperv_sign","an":"idle_a","af":49},{"id":9,"name":"Выкуси","ad":"mp_player_int_upperv_sign","an":"mp_player_int_v_sign","af":1},{"id":10,"name":"Вот как это делается","ad":"mp_player_introck","an":"mp_player_int_rock","af":1},{"id":11,"name":"Хватит","ad":"anim@heists@ornate_bank@chat_manager","an":"fail","af":1},{"id":12,"name":"Расстроиться","ad":"friends@frl@ig_1","an":"idle_a_lamar","af":1},{"id":13,"name":"Взрыв мозга","ad":"anim@mp_player_intcelebrationmale@mind_blown","an":"mind_blown","af":1},{"id":14,"name":"Одобрительно покивать","ad":"mp_cp_welcome_tutgreet","an":"greet","af":1},{"id":15,"name":"Неодобрительно покивать","ad":"anim@arena@celeb@podium@no_prop@","an":"dance_b_3rd","af":1},{"id":16,"name":"Недоумевание","ad":"mpcas6_int-18","an":"mp_m_freemode_01^3_dual-18","af":1},{"id":17,"name":"Недовольно согласиться","ad":"missheistpaletoscoresetup","an":"trevor_arrival_2","af":1},{"id":18,"name":"Разводить руками","ad":"anim@mp_celebration@draw@male","an":"draw_react_male_a","af":1},{"id":19,"name":"Удивленно посмотреть вниз","ad":"hs3f_int1-0","an":"hc_driver_dual-0","af":1},{"id":20,"name":"Трясти руками удивленно","ad":"random@arrests","an":"thanks_male_05","af":1}]
    },
    {
        id:7,
        name:'Стили походки',
        img:'racks',
        special:true,
        animations:
        [
            {
                id: 0,
                name: 'Стандартная',
                style: ''
            },
            {
                id: 1,
                name: 'Уставшая',
                style: 'ANIM_GROUP_MOVE_LEMAR_ALLEY'
            },
            {
                id: 2,
                name: 'С кулаком',
                style: 'clipset@move@trash_fast_turn'
            },
            {
                id: 3,
                name: 'С предметом в руке',
                style: 'missfbi4prepp1_garbageman'
            },
            {
                id: 4,
                name: 'С бодуна',
                style: 'move_characters@franklin@fire'
            },
            {
                id: 5,
                name: 'Неспешная',
                style: 'move_characters@Jimmy@slow@'
            },
            {
                id: 6,
                name: 'Напряжная',
                style: 'move_characters@michael@fire'
            },
            {
                id: 7,
                name: 'Дамская №1',
                style: 'FEMALE_FAST_RUNNER'
            },
            {
                id: 8,
                name: 'Дамская №2',
                style: 'move_f@flee@a'
            },
            {
                id: 9,
                name: 'Нервная',
                style: 'move_f@scared'
            },
            {
                id: 10,
                name: 'Сексуальная',
                style: 'move_f@sexy@a'
            },
            {
                id: 11,
                name: 'Похрамывать',
                style: 'move_heist_lester'
            },
            {
                id: 12,
                name: 'Слегка похрамывать',
                style: 'move_injured_generic'
            },
            {
                id: 13,
                name: 'Похрамывать с тростью',
                style: 'move_lester_CaneUp'
            },
            {
                id: 14,
                name: 'Вальяжно',
                style: 'move_m@bag'
            },
            {
                id: 15,
                name: 'Нахальная',
                style: 'move_m@brave'
            },
            {
                id: 16,
                name: 'Нахальная (медленная)',
                style: 'move_m@casual@d'
            },
            {
                id: 17,
                name: 'Упоротый',
                style: 'MOVE_M@BAIL_BOND_NOT_TAZERED'
            },
            {
                id: 18,
                name: 'Сильно упоротый',
                style: 'MOVE_M@BAIL_BOND_TAZERED'
            },
            {
                id: 19,
                name: 'С просони',
                style: 'move_m@fire'
            },
            {
                id: 20,
                name: 'Гангстерская',
                style: 'move_m@gangster@var_e'
            },
            {
                id: 21,
                name: 'Сонная',
                style: 'move_m@gangster@var_f'
            },
            {
                id: 22,
                name: 'Бандитская',
                style: 'move_m@gangster@var_i'
            },
            {
                id: 23,
                name: 'Расслабленная',
                style: 'move_m@JOG@'
            },
            {
                id: 24,
                name: 'Деловая',
                style: 'MOVE_P_M_ONE'
            },
            {
                id: 25,
                name: 'Злая',
                style: 'move_p_m_zero_janitor'
            },
            {
                id: 26,
                name: 'Вальяжная (медленная)',
                style: 'move_p_m_zero_slow'
            },
            {
                id: 27,
                name: 'Стильная',
                style: 'MOVE_M@FEMME@'
            },
            {
                id: 28,
                name: 'Мафиозная',
                style: 'MOVE_M@GANGSTER@NG'
            },
            {
                id: 29,
                name: 'Шикарная',
                style: 'MOVE_M@POSH@'
            },
            {
                id: 30,
                name: 'Крутая',
                style: 'MOVE_M@TOUGH_GUY@'
            },
            {
              id: 31,
              name: 'Пьяная',
              style: 'move_m@drunk@verydrunk'
            }
        ]
    }
]
}