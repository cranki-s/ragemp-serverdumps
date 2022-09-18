{


let AuctionList = null;
let AuctionOpened = false;

mp.events.add('Auction.OpenMenu.CallBack', (data)=>{
    let obj = JSON.parse(data);
    obj.property.forEach(item => {
        if(item.Location!=null){
            let area  = mp.game.zone.getNameOfZone(item.Location.x, item.Location.y, item.Location.z);
            item.Location = mp.game.ui.getLabelText(area);
        }
    });
    obj.business.forEach(item => {
        if(item.Location!=null){
            let area  = mp.game.zone.getNameOfZone(item.Location.x, item.Location.y, item.Location.z);
            item.Location = mp.game.ui.getLabelText(area);
        }
    });
    
    AuctionList = obj;
    globalThis.browser.open();
    global.browser.execute(`App.$router.push(${JSON.stringify({path : '/auction'})})`);
});

mp.events.add('Auction:GetAllData', ()=>{
    global.browser.execute(`RPC.resolve('Auction:GetAllData', ${JSON.stringify(AuctionList)})`);
    AuctionOpened = true;
});




mp.events.add('Auction:MakeBet', (id, payType, money)=>{
    Nexus.callRemote('Auction.MakeBet.Server', id, money, payType);
});

mp.events.add('Auction.NewLot', (type, lotJson)=>{
    let obj = JSON.parse(lotJson);
        if(obj.Location!=null){
            let area  = mp.game.zone.getNameOfZone(obj.Location.x, obj.Location.y, obj.Location.z);
            obj.Location = mp.game.ui.getLabelText(area);
        }
    global.browser.execute(`EventBus.emit('Auction:AddNewLot', '${type}', ${JSON.stringify(obj)})`);
});

mp.events.add('Auction.RemoveLot', (type, lotNum)=>{
    global.browser.execute(`EventBus.emit('Auction:RemoveLot', '${type}', ${lotNum})`);
});


mp.events.add('Auction:Close', ()=>{
    AuctionOpened = false;
    globalThis.browser.close();
})

}