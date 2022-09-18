{
let Market = null;
mp.events.add('Market:Save',(items,SpaceID)=>{
    Nexus.callRemote('Market:SaveSpaceItem',items, SpaceID);   
    mp.events.call('Market:Close');
});
mp.events.add('Market:Open',(items)=>{    
    if(Market == null){
        Market = mp.browsers.new('http://package/systems/player/MarketMenu/Market/market.html');        
        Market.execute(`app.locale = '${global.Language}'`)
        Market.execute(`app.setKey(${JSON.stringify(global.cdnKey)})`);
        Market.execute(`app.load(${items})`);
    }   
    global.menuOpen(); 
});

mp.events.add('Market:Close',()=>{
    if(Market != null){
        Market.destroy();
        Market = null;
    }   
    global.menuClose(); 
});
let TypeMarket;
mp.events.add('Market:OpenBuyingMenu',(items,TypeMarket)=>{
    if(Market == null){
        Market = mp.browsers.new('http://package/systems/player/MarketMenu/Market/market.html');        
        Market.execute(`app.locale = '${global.Language}'`)        
        Market.execute(`app.setKey(${JSON.stringify(global.cdnKey)})`);        
        Market.execute(`app.loadBuyingMenu(${items})`);
        TypeMarket = TypeMarket;
    } 
    global.menuOpen();    
});

mp.events.add('Market:BuyItem', async(item, count, PayType,marketID,index)=>{    
   let status = await mp.events.callRemoteProc('Market:BuyItem', item, count, PayType, marketID); 
   if(status){
        Market.execute(`app.BuySucsess(${index},${count})`);
   }
});


mp.events.add('Market:Notify', (type, layout, msg, time) => {
	if(Market != null){
		Market.execute(`notify(${type},${layout},"${msg}",${time})`);
	}
});

mp.events.add("Market:setClothes", (item) => {    
        const a = mp.players.local;
        let rotation
    if (TypeMarket != 'CarMarket') {
        rotation = mp.objects.toArray().find(x => x.hasVariable("_market") && mp.game.system.vdist2(a.position.x, a.position.y, a.position.z, x.position.x, x.position.y, x.position.z) < 5).rotation
    }else rotation = 90 
            a.setHeading(rotation.z + 180),             
            item = JSON.parse(item);                        
            let Split;
            if(item.ID != -20){
                Split = item.Data.split('_');
            }else{
                Split = item.Datas.split('_');
            }
            if(item.ID *-1 > 11 && item.ID *-1 != 20){
                let componentID;
                switch (item.ID) {
                    case -12:
                        componentID = 0;
                        break;
                    case -13:
                        componentID = 1;
                        break;
                    case -14:
                        componentID = 6;
                        break;
                }                
                a.setPropIndex(componentID, Number(Split[0]), Number(Split[1]), !0)
            }else{
                let compon = item.ID == -20 ? -5 : item.ID;                
                a.setComponentVariation(-1 * compon, Number(Split[0]), Number(Split[1]), 2)
            }
            setTimeout(() => {
                switch (item.ID) {

                    case -6://
                        {
                            global.setCameraToPlayer(.5, new mp.Vector3(0, 0, -.7), new mp.Vector3(0, 0, -1), 0, 500);
                            break
                        }
                    case -20:
                        {
                            global.setCameraToPlayer(1, new mp.Vector3(0, 0, .1), new mp.Vector3(0, 0, 0), 180, 500);
                            break
                        }
                    case -4:
                        {
                                global.setCameraToPlayer(1, new mp.Vector3(0, 0, -.7), new mp.Vector3(0, 0, -.6), 0, 500);
                                break
                        }
                    case -20://
                        {
                            global.setCameraToPlayer(.65, new mp.Vector3(0, 0, .1), new mp.Vector3(0, 0, 0), 35, 500);
                            break
                        }
                    case -0://
                        {
                            global.setCameraToPlayer(1, new mp.Vector3(0, 0, .9), new mp.Vector3(0, 0, 1), 0, 500);
                            break
                        }
                    case -1://
                        {
                            global.setCameraToPlayer(.65, new mp.Vector3(0, 0, .7), new mp.Vector3(0, 0, .85), 0, 500);
                            break
                        }
                    case -2:
                        {
                            global.setCameraToPlayer(.5, new mp.Vector3(0, 0, .7), new mp.Vector3(0, 0, .7), 0, 500);
                            break
                        }
                    case -5://Не ок
                        {
                            global.setCameraToPlayer(.65, new mp.Vector3(0, 0, .1), new mp.Vector3(0, 0, 0), 35, 500);
                            break
                        }
                    case -14:
                        {
                            global.setCameraToPlayer(.65, new mp.Vector3(0, 0, .1), new mp.Vector3(0, 0, 0), 260, 500);
                            break
                        }
                    case -11:
                    case -8:
                    default:
                        {
                            global.setCameraToPlayer(1, new mp.Vector3(0, 0, .1), new mp.Vector3(0, 0, 0), 0, 500);
                            break
                        }
                }
            }, 200)
})
mp.events.add("Market:disableCamera", () => {
    global.resetCamera();
    Nexus.callRemote('Market:Close');
});
}