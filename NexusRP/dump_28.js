{
let houses;
var housesWindow = null;
var housesOppened = false;
let HouseType;

// // //
mp.events.add('housesShow', (data, type) => {
    if (houses == null) {
        houses = mp.browsers.new('http://package/systems/houses/info/FRONT/construction-info.html');
        houses.name = 'nexusbrowser';
    }
    houses.execute(`constructionInfo.locale='${global.Language}'`);    
    houses.execute(`constructionInfo.information=${data}`);
    houses.execute(`constructionInfo.construction=${type}`);
    houses.execute(`constructionInfo.initCanvas()`);
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    HouseType = type;
});
mp.events.add('closehouses', () => {
    global.menuOpened = false;
    mp.gui.cursor.visible = false;
    if(houses != null){
        houses.destroy();
        houses = null;
    }    
});
mp.events.add('buyHouse', () => {
    if (HouseType == 0) {
        Nexus.callRemote('houseCallback', "buy");
    } else {
        Nexus.callRemote('FamilyHousecallback');
    }
});
mp.events.add('interiorHouse', () => {
    if (HouseType == 0) {
        Nexus.callRemote('houseCallback', "interior");
    } else {
        Nexus.callRemote('FamilyGoInt');
    }
});
}