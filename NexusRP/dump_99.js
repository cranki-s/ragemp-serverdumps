{
mp.events.add('Parkings.BuySpace',()=>{
    globalThis.browser.open();
    globalThis.browser.execute(`window.locale='${global.Language}'`)
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({path:'/parking/buy'})})`); 
})
mp.events.add('Parking.GetParams',()=>{
    NewEvent.callRemote('Parking.GetParams');
})
mp.events.add('Parking.GetParamsCallback',(pakingData)=>{
    globalThis.browser.open();
    globalThis.browser.execute(`RPC.resolve('Parking.GetParams',${pakingData})`);
})
mp.events.add('Parking.PurchaseSpace',(actionType,moneyType,innerValue)=>{
    if(actionType === 'buy') {
        NewEvent.callRemote('Parkings.BuySpaceCallback',moneyType,innerValue);
    }else{
        NewEvent.callRemote('Parkings.AddTimeCallback',moneyType,innerValue);
    }
});
mp.events.add('Parking.PurchaseSpaceCallback',(sucsess)=>{
    globalThis.browser.execute(`RPC.resolve('Parking.PurchaseSpace',${sucsess})`);
    globalThis.browser.close();
});
mp.events.add('Parkings.AddTime',()=>{
    globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({path:'/parking/add'})})`);
})
mp.events.add('Parkings.EndRent',()=>{
    globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({path:'/parking/end'})})`);
})
mp.events.add('Parkings.EndRentClient',()=>{
    NewEvent.callRemote('Parkings.EndRentCallback');
    globalThis.browser.close();
})

mp.events.add('Parking.Close', ()=>{
    global.browser.close();
})
}