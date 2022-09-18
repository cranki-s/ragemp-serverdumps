{
global.StoreType = null;
let contolsBrowser;
let StoreActiveItem;
global.StoreLoadItems = null;
let StoreTattoo;
var tattooValues = [0, 0, 0, 0, 0, 0];
var barberValues = {};
let StoreBizMark;
mp.events.add('OpenGlobalShop',(type,title,subtitle,bizmarkup,cash,bank,wallettype)=>{
    StoreType = type;    
    bodyCamStart = mp.players.local.position;
    StoreActiveItem = null;
    var camValues;
    StoreBizMark = bizmarkup;
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
    switch(type){
        case "backpacks":
            camValues = { Angle: localplayer.getRotation(2).z + 90, Dist: 1.5, Height: 0.2 };                 
            global.StoreLoadItems = JSON.parse(JSON.stringify(global.backs));
            localplayer.clearProp(0);
            localplayer.clearProp(1);
            break;
        case "masks":
            camValues = { Angle: localplayer.getRotation(2).z + 90, Dist: 0.7, Height: 0.6 };    
            global.StoreLoadItems = JSON.parse(JSON.stringify(global.clothesMasks));
            global.StoreLoadItems.forEach(e => {
                e.price = Math.round(e.price * bizmarkup);
            });            
            break;
        case "appearance":  
            StoreTattoo = [{id:0,type:'ahairstyle',name:"Волосы"},{id:1,type:'abeard',name:"Борода"},{id:2,type:'abrows',name:"Брови"},{id:3,type:'atorso',name:"Торс"},{id:4,type:'alenses',name:"Линзы"},{id:5,type:'apomade',name:"Помада"},{id:6,type:'ablush',name:"Румянец"},{id:7,type:'ashadows',name:"Тени"}];
            global.StoreLoadItems = StoreTattoo; 
            barberValues["ahairstyle"] = { Style: 0, Color: 0 };
            barberValues["abeard"] = { Style: 255, Color: 0 };
            barberValues["abrows"] = { Style: 255, Color: 0 };
            barberValues["atorso"] = { Style: 255, Color: 0 };
            barberValues["alenses"] = { Style: 0, Color: 0 };
            barberValues["apomade"] = { Style: 255, Color: 0 };
            barberValues["ablush"] = { Style: 255, Color: 0 };
            barberValues["ashadows"] = { Style: 255, Color: 0 };    
            camValues = bodyCamValues['ahairstyle'];
            break;
        case "tattoo":
            camValues = { Angle: localplayer.getRotation(2).z + 90, Dist: 0.7, Height: 0.6 };   
            StoreTattoo = [{id:0,type:'ttorso',name:'Торс'},{id:1,type:'thead',name:'Голова'},{id:2,type:'tlhand',name:'Левая рука'},{id:3,type:'trhand',name:'Правая рука'},{id:4,type:'tlleg',name:'Левая нога'},{id:5,type:'trleg',name:'Правая нога'}];
            global.StoreLoadItems = StoreTattoo;
            tattooValues = [0, 0, 0, 0, 0, 0];
            break;
    }
    var pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
    mp.players.local.setHeading(49);
    playerheading.startveh(mp.players.local);
    globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/clShop/${type}` })})`);
    mp.events.call("clShop:UpdateMoney", cash, bank);
    global.menuOpen();

})
mp.events.add('clShop:GetItems',(shopType,category)=>{
    if(category) category = JSON.parse(category);
    if(shopType == "clothes") {mp.events.call('Clothes:openCategory',category.id);return;}  
    let items = shopType == "tattoo" || shopType == "appearance" ? TatooBarberItems(shopType,category.type) : global.StoreLoadItems;
    //Nexus.callRemote('console',JSON.stringify(items));
    globalThis.browser.execute(`window.RPC.resolve('clShop:GetItems',${JSON.stringify(items)},'fashion')`);
})
mp.events.add('clShop:GetModifications', (shopType, category, item) => {
    item = JSON.parse(item);
    if(category) category = JSON.parse(category);
    if(shopType == "clothes") {mp.events.call('Clothes:setClothes',item.id, item.name);return;}  
    let modifications = shopType != "clothes" ? shopType == "appearance" ? GetBarberModificator(category.type) : global.StoreLoadItems.find(x => x.id === item.id).modifications : global.StoreLoadItems.find(x=>x.id===category.id).items.find(x=>x.id===item.id).colors;
    globalThis.browser.execute(`window.RPC.resolve('clShop:GetModifications', ${JSON.stringify(modifications)})`);
})
mp.events.add('clShop:ApplyModification', (shopType, category, item, modification) => {
    item = JSON.parse(item);
    let itemID = item.id;
    let categoryID;
    if(category != "null" && category) {
        category = JSON.parse(category);
        categoryID = category.type;
    }
    if(modification)modification = JSON.parse(modification);
    if(shopType == "clothes") {mp.events.call('Clothes:setClothesColor',modification.id);return;}  
    if(shopType =="backpacks"){
        StoreActiveItem = global.StoreLoadItems.find(x=>x.id===itemID);    
        localplayer.setComponentVariation(5, StoreActiveItem.Variation, StoreActiveItem.color, 0);
    }
    else if(shopType == "masks" ){
        StoreActiveItem = global.StoreLoadItems.find(x=>x.id===itemID);
        localplayer.setComponentVariation(1, StoreActiveItem.Variation, modification ? modification.id : 0, 0);
    }
    else if(shopType=="tattoo"){
        StoreLoadItems = JSON.parse(JSON.stringify(global.tattoos[categoryID]))
        StoreActiveItem = StoreLoadItems.find(x=>x.id===itemID);
        var tId = category.id;
        tattooValues[tId] = itemID;
        var hash = (localplayer.getVariable("GENDER")) ? StoreActiveItem.MaleHash : StoreActiveItem.FemaleHash; 
        localplayer.clearDecorations();
        var playerTattoos = JSON.parse(localplayer.getVariable("TATTOOS"));
            for (let x = 0; x < playerTattoos[tId].length; x++) { // Очищаем ненужные татушки

                for (let i = 0; i < StoreActiveItem.Slots.length; i++) {

                    if (playerTattoos[tId][x].Slots.indexOf(StoreActiveItem.Slots[i]) != -1) {
                        playerTattoos[tId][x] = null;
                        break;
                    }

                }
            }

        for (let x = 0; x < 6; x++) // Восстанавливаем старые татуировки игрока, кроме тех, которые занимают очищенные слоты
            if (playerTattoos[x] != null)
                for (let i = 0; i < playerTattoos[x].length; i++)
                    if (playerTattoos[x][i] != null)
                        localplayer.setDecoration(mp.game.joaat(playerTattoos[x][i].Dictionary), mp.game.joaat(playerTattoos[x][i].Hash));
        localplayer.setDecoration(mp.game.joaat(StoreActiveItem.Dictionary), mp.game.joaat(hash));
    }
    else if(shopType == "appearance"){        
        barberValues[categoryID].Color = modification ? modification.id : 0;
        switch (categoryID) {
            case "ahairstyle":
                let gender = (localplayer.getVariable("GENDER")) ? 0 : 1;
                barberValues[categoryID].Style = hairIDList[gender][itemID];
                localplayer.setComponentVariation(2, barberValues[categoryID].Style, 0, 0);
                localplayer.setHairColor(barberValues[categoryID].Color, 0);                
                break;
            case "abeard":
                barberValues[categoryID].Style = (itemID == 0) ? 255 : itemID - 1;
                localplayer.setHeadOverlay(1, barberValues[categoryID].Style, 100, barberValues[categoryID].Color, barberValues[categoryID].Color);            
                break;
            case "abrows":
                barberValues[categoryID].Style = (itemID == 0) ? 255 : itemID - 1;
                localplayer.setHeadOverlay(2, barberValues[categoryID].Style, 100, barberValues[categoryID].Color, barberValues[categoryID].Color);                
                break;
            case "atorso":
                barberValues[categoryID].Style = (itemID == 0) ? 255 : itemID - 1;
                localplayer.setHeadOverlay(10, barberValues[categoryID].Style, 100, barberValues[categoryID].Color, barberValues[categoryID].Color);            
                break;
            case "alenses":
                barberValues[categoryID].Style = itemID;
                localplayer.setEyeColor(itemID);
                break;
            case "apomade":
                barberValues[categoryID].Style = (itemID == 0) ? 255 : itemID - 1;
                localplayer.setHeadOverlay(8, barberValues[categoryID].Style, 100, barberValues[categoryID].Color, barberValues[categoryID].Color);
                break;
            case "ablush":
                barberValues[categoryID].Style = (itemID == 0) ? 255 : itemID - 1;
                localplayer.setHeadOverlay(5, barberValues[categoryID].Style, 100, barberValues[categoryID].Color, barberValues[categoryID].Color);
                break;
            case "ashadows":
                barberValues[categoryID].Style = (itemID == 0) ? 255 : itemID - 1;
                localplayer.setHeadOverlay(4, barberValues[categoryID].Style, 100, barberValues[categoryID].Color, barberValues[categoryID].Color);
                break;

        }        
    }
})

mp.events.add('clShop:UpdateMoney',(cash,bank)=>{
    globalThis.browser.execute(`window.AppData.commit('character/setMoney',{bank:${bank},cash:${cash}})`);
})

mp.events.add('clShop:BuyItem', (MoneyType, shopType, activeCategory, activeItem, activeModification) => {
    activeItem = JSON.parse(activeItem)
    activeModification = JSON.parse(activeModification)
    if(activeCategory) activeCategory = JSON.parse(activeCategory)
    if(global.QuestShop)
    {
        mp.events.call('QuestShop:buyClothes', shopType, activeModification.id, activeItem);
        return;
    }
    if(shopType == "clothes")
    {
        if(!activeModification) return;
        mp.events.call('Clothes:buyClothes',MoneyType,activeModification.id, activeItem)
        return;
    }
    let item = global.StoreLoadItems.find(x => x.id === activeItem.id)    
    if(shopType =="backpacks"){
        Nexus.callRemote('backsbuy', item.Variation, item.color,MoneyType);    
    }
    else if(shopType =="masks"){
        Nexus.callRemote('buyMasks', item.Variation, item.color[activeModification.id],MoneyType);
    }
    else if(shopType =="tattoo"){
        let gender = localplayer.getVariable("GENDER");
        let hash = gender ? item.MaleHash : item.FemaleHash;
        Nexus.callRemote("buyTattoo", hash, item.price, MoneyType, activeCategory.id,JSON.stringify(item.Slots),item.Dictionary,item.name);
    }
    else if(shopType =="appearance"){
        Nexus.callRemote("buyBarber", activeCategory.type, barberValues[activeCategory.type].Style, barberValues[activeCategory.type].Color,MoneyType);
    }
})
mp.events.add('clShop:GetCategories',(shopType)=>{
    StoreType = shopType;
   if(shopType == "clothes") {mp.events.call('Clothes:GetCategories');return;}
   globalThis.browser.execute(`window.RPC.resolve('clShop:GetCategories',${JSON.stringify(StoreTattoo)},'lossantos')`);
  })
mp.events.add('clShop:CloseBrowser',()=>{
    globalThis.browser.close();
    if(global.QuestShop)
    {
        Nexus.callRemote('QuestShop:Close');
        return;
    }
    if(StoreType=="clothes"){
        mp.events.call('Clothes:closeClothesShop');
        return;
    }
    global.menuClose();
    bodyCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 500, true, false);
    playerheading.stop()
    
    if(StoreType=="backpacks"){
        Nexus.callRemote('closebacks');
    }
    else if(StoreType=="masks"){
        Nexus.callRemote('cancelMasks');
    }
    else if(StoreType=="tattoo" || StoreType == "appearance"){
        localplayer.clearDecorations();
        Nexus.callRemote("cancelBody");
    }    
});


function TatooBarberItems(StoreType,categoryID)
{
    let gender = localplayer.getVariable("GENDER");    
    var camValues;
    let StotePushItems = [];
    if (StoreType == "tattoo") {
        StoreActiveItem = JSON.parse(JSON.stringify(global.tattoos[categoryID]));        
        StoreActiveItem.forEach(element => {
            let hash = (gender) ? element.MaleHash : element.FemaleHash;
            if (hash != "") {
                element.price = Math.round(element.price * StoreBizMark)
                StotePushItems.push(element);
            }
        });
        camValues = bodyCamValues[categoryID][0];
    }else {
        StoreActiveItem = JSON.parse(JSON.stringify(global.barberPrices[categoryID]));  
        StoreActiveItem.forEach(e=>{
            e.price = e.price * StoreBizMark
        })
        StotePushItems = StoreActiveItem;   
        camValues = bodyCamValues[categoryID];   
    }
    const camPos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), localplayer.getRotation(2).z + 90 + camValues.Angle, camValues.Dist);
    bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    return StotePushItems;
}
function GetBarberModificator(type){
    let modification;
    switch(type){
        case "ahairstyle":            
        case "abeard":
        case "abrows":
        case "atorso":
            modification = [{"id":0},{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":12},{"id":13},{"id":14},{"id":15},{"id":16},{"id":17},{"id":18},{"id":19},{"id":20},{"id":21},{"id":22},{"id":23},{"id":24},{"id":25},{"id":26},{"id":27},{"id":28},{"id":29},{"id":30},{"id":31},{"id":32},{"id":33},{"id":34},{"id":35},{"id":36},{"id":37},{"id":38},{"id":39},{"id":40}];
            break;    
        case "apomade":
            modification = [{"id":0},{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9}];
            break;
        case "ablush":
            modification = [{"id":0},{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6}];
            break;
        case "ashadows":
        case "alenses":
            modification = [{id:0}];
            break;
    }
    return modification;
}
var bodyCamValues = {
    "ahairstyle": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "abeard": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "abrows": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "atorso": { Angle: 0, Dist: 1, Height: 0.2 },
    "alenses": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "apomade": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "ablush": { Angle: 0, Dist: 0.5, Height: 0.7 },
    "ashadows": { Angle: 0, Dist: 0.5, Height: 0.7 },

    "ttorso": [
        { Angle: 0, Dist: 1, Height: 0.2 },
        { Angle: 0, Dist: 1, Height: 0.2 },
        { Angle: 0, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 180, Dist: 1, Height: 0.2 },
        { Angle: 305, Dist: 1, Height: 0.2 },
        { Angle: 55, Dist: 1, Height: 0.2 },
    ],
    "thead": [
        { Angle: 0, Dist: 1, Height: 0.5 },
        { Angle: 305, Dist: 1, Height: 0.5 },
        { Angle: 55, Dist: 1, Height: 0.5 },
        { Angle: 180, Dist: 1, Height: 0.5 },
        { Angle: 0, Dist: 0.5, Height: 0.5 },
        { Angle: 0, Dist: 0.5, Height: 0.5 },
    ],
    "tlhand": [
        { Angle: 55, Dist: 1, Height: 0.0 },
        { Angle: 55, Dist: 1, Height: 0.1 },
        { Angle: 55, Dist: 1, Height: 0.1 },
    ],
    "trhand": [
        { Angle: 305, Dist: 1, Height: 0.0 },
        { Angle: 305, Dist: 1, Height: 0.1 },
        { Angle: 305, Dist: 1, Height: 0.1 },
    ],
    "tlleg": [
        { Angle: 55, Dist: 1, Height: -0.6 },
        { Angle: 55, Dist: 1, Height: -0.6 },
    ],
    "trleg": [
        { Angle: 305, Dist: 1, Height: -0.6 },
        { Angle: 305, Dist: 1, Height: -0.6 },
    ],
};
}