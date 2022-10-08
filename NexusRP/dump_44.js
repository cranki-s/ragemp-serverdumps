{
let clothesCamValues = [
    { Angle: 0, Dist: 0.7, Height: 0.6 },
    { Angle: 0, Dist: 1.4, Height: 0.2 },
    { Angle: 0, Dist: 1.4, Height: 0.2 },
    { Angle: 0, Dist: 1.4, Height: -0.4 },
    { Angle: 0, Dist: 1.2, Height: -0.7 },
    { Angle: 0, Dist: 1, Height: -0.2 },
    { Angle: 74, Dist: 1, Height: 0 },
    { Angle: 0, Dist: 0.7, Height: 0.6 },
    { Angle: 0, Dist: 1, Height: 0.3 },
];
global.ClothesShopType;
global.allClothes = require('/configs/clothes').allClothes;
global.genderType;
const playerheading = require("/lib/back/js/rotatorplayer.js");
global.accessibleClothes = null;
global.categoryType;
let accessibleItems;
global.clothesType = -1;
global.bodyCamStart = null;
global.bodyCam= null;
global.markUP= 1.0;
global.ClothesCategory = [];
global.getCameraOffset = function getCameraOffset(pos, angle, dist) {
    angle = angle * 0.0174533;
    pos.y = pos.y + dist * Math.sin(angle);
    pos.x = pos.x + dist * Math.cos(angle);
    return pos;
}

global.clearClothes = function clearClothes() {
    let clothesEmpty = JSON.parse(`{"1":{"1":0,"3":15,"4":21,"5":0,"6":34,"7":0,"8":15,"9":0,"10":0,"11":15},"0":{"1":0,"3":15,"4":15,"5":0,"6":35,"7":0,"8":6,"9":0,"10":0,"11":15}}`);
    mp.players.local.clearProp(0);
    mp.players.local.clearProp(1);
    mp.players.local.clearProp(2);
    mp.players.local.clearProp(6);
    mp.players.local.clearProp(7);
    mp.players.local.setComponentVariation(1, clothesEmpty[genderType][1], 0, 0);
    mp.players.local.setComponentVariation(3, clothesEmpty[genderType][3], 0, 0);
    mp.players.local.setComponentVariation(4, clothesEmpty[genderType][4], 0, 0);
    mp.players.local.setComponentVariation(5, clothesEmpty[genderType][5], 0, 0);
    mp.players.local.setComponentVariation(6, clothesEmpty[genderType][6], 0, 0);
    mp.players.local.setComponentVariation(7, clothesEmpty[genderType][7], 0, 0);
    mp.players.local.setComponentVariation(8, clothesEmpty[genderType][8], 0, 0);
    mp.players.local.setComponentVariation(9, clothesEmpty[genderType][9], 0, 0);
    mp.players.local.setComponentVariation(10, clothesEmpty[genderType][10], 0, 0);
    mp.players.local.setComponentVariation(11, clothesEmpty[genderType][11], 0, 0);
}
mp.events.add('openClothes', (shop,MarkUp) => {    
    //genderType = 1;
	markUP = MarkUp;
    ClothesShopType = shop;
	global.menuOpen();
    global.genderType = (localplayer.getVariable("GENDER")) ? 1 : 0;
    global.bodyCamStart = mp.players.local.position;
    var camValues = { Angle: mp.players.local.getRotation(2).z + 90, Dist: 1.3, Height: 0.3 };
    var pos = getCameraOffset(new mp.Vector3(global.bodyCamStart.x, global.bodyCamStart.y, global.bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(global.bodyCamStart.x, global.bodyCamStart.y, global.bodyCamStart.z + camValues.Height);
    bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);
    mp.players.local.setHeading(49);
    playerheading.startveh(mp.players.local);
    global.clearClothes();
    ClothesCategory = [];
    accessibleClothes = allClothes[shop][genderType].sort((previousCategory,nextCategory)=>previousCategory.id-nextCategory.id);   
    accessibleClothes.forEach(category => {
        if(category.items.length > 0)
        ClothesCategory.push(
            {
                id:category.id,
                name:category.name,
                type:'c'+category.type
            }
        )
    });
    //mp.gui.cursor.visible = true;
    globalThis.browser.open();    
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/clShop/clothes` })})`);
    //global.menuOpened = true;
  //  clothesShop.execute(`clothShop.categoriesList=${JSON.stringify(ClothesCategory)}`);
});
mp.events.add('Clothes:GetCategories', () => {
    globalThis.browser.execute(`window.RPC.resolve('clShop:GetCategories',${JSON.stringify(ClothesCategory)},'binco')`);
});
mp.events.add('Clothes:openCategory', (categoryID) => {
    categoryType = categoryID;
    accessibleItems = accessibleClothes.find(category=>category.id == categoryID).items.sort((previousClothing,nextClothing)=>previousClothing.id-nextClothing.id);
    let browserClothes = [];
    accessibleItems.forEach(clothes=>{
        browserClothes.push(
            {
                id:parseInt(clothes.id),
                name:clothes.name,
                price:(clothes.price * markUP).toFixed()
            }
        );
    })

    const camValues = clothesCamValues[categoryType];
    const camPos = getCameraOffset(new mp.Vector3(global.bodyCamStart.x, global.bodyCamStart.y, global.bodyCamStart.z + camValues.Height), mp.players.local.getRotation(2).z + 90 + camValues.Angle, camValues.Dist);
    global.bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
    global.bodyCam.pointAtCoord(global.bodyCamStart.x, global.bodyCamStart.y, global.bodyCamStart.z + camValues.Height);   
    //mp.game.cam.renderScriptCams(true, true, 1500, true, false);
    globalThis.browser.execute(`window.RPC.resolve('clShop:GetItems',${JSON.stringify(browserClothes)})`);
});

mp.events.add('Clothes:setClothes', (clothesID,clothesName) => {
    clothesType = parseInt(clothesID);
    let browserColors = [];
    browserColors = accessibleItems.find(clothes=>clothes.id===clothesType && clothes.name === clothesName).colors;    
    globalThis.browser.execute(`window.RPC.resolve('clShop:GetModifications', ${JSON.stringify(browserColors)})`);
});

mp.events.add('Clothes:setClothesColor', async (colorID) => {
    colorID = parseInt(colorID)
    let category = accessibleClothes.find(category=>category.id == categoryType);    
    switch(category.type){
        case 'hats':{
            mp.players.local.setPropIndex(0, clothesType, colorID, true);
            return;
        }
        case 'tops':{
            let torso = await mp.events.callRemoteProc('ClothesShop:GetTorsos',clothesType, colorID, ClothesShopType);
            mp.players.local.setComponentVariation(3, torso, 0, 0);
            mp.players.local.setComponentVariation(11, +clothesType, colorID, 0);            
            return;
        }
        case 'undershits':{
            let id = await mp.events.callRemoteProc('ClothesShop:GetUndershirt',clothesType);
            mp.players.local.setComponentVariation(8, id, colorID, 0);
            //mp.players.local.setComponentVariation(3, global.validTorsos[genderType][clothesType] ? global.validTorsos[genderType][clothesType] : 2, 0, 0);
            return;
        }
        case 'legs':{
            mp.players.local.setComponentVariation(4, clothesType, colorID, 0);
            return;
        }
        case 'shoes':{
            mp.players.local.setComponentVariation(6, clothesType, colorID, 0);
            return;
        }
        case 'gloves':{
            let correctGloves = {"1":{"1":{"4":16},"2":{"4":17},"3":{"4":18},"4":{"0":19,"1":20,"2":21,"4":22,"5":23,"6":24,"8":25,"11":26,"12":27,"14":28,"15":29,"112":115,"113":122,"114":129},"5":{"0":30,"1":31,"2":32,"4":33,"5":34,"6":35,"8":36,"11":37,"12":38,"14":39,"15":40,"112":116,"113":123,"114":130},"6":{"0":41,"1":42,"2":43,"4":44,"5":45,"6":46,"8":47,"11":48,"12":49,"14":50,"15":51,"112":117,"113":124,"114":131},"7":{"0":52,"1":53,"2":54,"4":55,"5":56,"6":57,"8":58,"11":59,"12":60,"14":61,"15":62,"112":118,"113":125,"114":132},"8":{"0":63,"1":64,"2":65,"4":66,"5":67,"6":68,"8":69,"11":70,"12":71,"14":72,"15":73,"112":119,"113":126,"114":133},"9":{"0":74,"1":75,"2":76,"4":77,"5":78,"6":79,"8":80,"11":81,"12":82,"14":83,"15":84,"112":120,"113":127,"114":134},"10":{"0":85,"1":86,"2":87,"4":88,"5":89,"6":90,"8":91,"11":92,"12":93,"14":94,"15":95,"112":121,"113":128,"114":135},"11":{"4":96},"12":{"4":97},"13":{"0":99,"1":100,"2":101,"4":102,"5":103,"6":104,"8":105,"11":106,"12":107,"14":108,"15":109},"14":{"4":110}},"0":{"1":{"3":17},"2":{"3":18},"3":{"3":19},"4":{"0":20,"1":21,"2":22,"3":23,"4":24,"5":25,"6":26,"7":27,"9":28,"11":29,"12":30,"14":31,"15":32,"129":132,"130":139,"131":146,"153":154,"161":162},"5":{"0":33,"1":34,"2":35,"3":36,"4":37,"5":38,"6":39,"7":40,"9":41,"11":42,"12":43,"14":44,"15":45,"129":133,"130":140,"131":147,"153":155,"161":163},"6":{"0":46,"1":47,"2":48,"3":49,"4":50,"5":51,"6":52,"7":53,"9":54,"11":55,"12":56,"14":57,"15":58,"129":134,"130":141,"131":148,"153":156,"161":164},"7":{"0":59,"1":60,"2":61,"3":62,"4":63,"5":64,"6":65,"7":66,"9":67,"11":68,"12":69,"14":70,"15":71,"129":135,"130":142,"131":149,"153":157,"161":165},"8":{"0":72,"1":73,"2":74,"3":75,"4":76,"5":77,"6":78,"7":79,"9":80,"11":81,"12":82,"14":83,"15":84,"129":136,"130":143,"131":150,"153":158,"161":166},"9":{"0":85,"1":86,"2":87,"3":88,"4":89,"5":90,"6":91,"7":92,"9":93,"11":94,"12":95,"14":96,"15":97,"129":137,"130":144,"131":151,"153":159,"161":167},"10":{"0":98,"1":99,"2":100,"3":101,"4":102,"5":103,"6":104,"7":105,"9":106,"11":107,"12":108,"14":109,"15":110,"129":138,"130":145,"131":152,"153":160,"161":168},"11":{"3":111},"12":{"0":114,"1":115,"2":116,"3":117,"4":118,"5":119,"6":120,"7":121,"9":122,"11":123,"12":124,"14":125,"15":126}}}
            mp.players.local.setComponentVariation(3, correctGloves[genderType][clothesType][15], colorID, 0);
            return;
        }
        case 'watches':{
            mp.players.local.setPropIndex(6, clothesType, colorID, true);
            return;
        }
        case 'glasses':{
            mp.players.local.setPropIndex(1, clothesType, colorID, true);
            return;
        }
        case 'accessories':{
            mp.players.local.setComponentVariation(7, clothesType, colorID, 0);
            return;
        }
    }
});

mp.events.add('Clothes:buyClothes', (cash, ColorID, activeItem) => {

    try {
        let categoryTypes = accessibleClothes.find(category => category.id == categoryType).type;
        let ClothesId = activeItem.id;
        let ItemName = activeItem.name;
        NexusEvent.callRemote('ClothesShop:buy', categoryTypes, ClothesId, ColorID, cash, ItemName, ClothesShopType)
    } catch { }
})

mp.events.add('Clothes:closeClothesShop',()=>{
    if(new Date().getTime() - global.lastCheck < 50) return; 
	global.lastCheck = new Date().getTime();
    global.menuClose();  
    bodyCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 500, true, false);
    playerheading.stop()
    NexusEvent.callRemote('ClothesShop:exit');
});









}